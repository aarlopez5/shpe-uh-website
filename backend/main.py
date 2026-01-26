from datetime import timedelta
from fastapi import FastAPI, Depends, HTTPException, status
from sqlmodel import Session
from contextlib import asynccontextmanager
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm

from models.user import User, UserOut, UserCreate
from database import create_db
from security.jwt import Token, ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token
from security.hashing import get_password_hash
from services.auth_user import authenticate_user
from services.dependencies import get_current_user, SessionDependencies
from services.get_user import get_user_by_email

# Inits the DB
@asynccontextmanager
async def lifespan(app):
    create_db()
    yield

app = FastAPI(lifespan=lifespan)

# Returns token 
@app.post('/login')
async def login_for_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session: SessionDependencies) -> Token:
    email = form_data.username
    user = authenticate_user(session, email, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    return Token(access_token=access_token, token_type="bearer")


@app.get('/me', response_model=UserOut)
async def me(user: Annotated[User, Depends(get_current_user)]):
    return user

@app.post('/signup', status_code=status.HTTP_201_CREATED)
async def signup(user_in: UserCreate, session: SessionDependencies):
    existing_user = get_user_by_email(session, user_in.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email is already registered"
        )
    
    user_db = User(**user_in.model_dump(exclude={"password", "email"}), hashed_password=get_password_hash(user_in.password))

    session.add(user_db)
    session.commit()
    session.refresh(user_db)

    return {"message" : "User created successfully"}

