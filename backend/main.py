from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from contextlib import asynccontextmanager
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm

from models.user import User
from database import create_db, get_session
from auth import oauth2_scheme, verify_password, Token, ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token


# Inits the DB
@asynccontextmanager
async def lifespan(app):
    create_db()
    yield

SessionDependencies = Annotated[Session, Depends(get_session)]

app = FastAPI(lifespan=lifespan)

def authenticate_user(session: Session, email: str, password: str) -> User | None:
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()

    if not user or not verify_password(password, user.hashed_password):
        return None
    
    return user
    

@app.post('/login')
async def login_for_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session: SessionDependencies) -> Token:
    user = authenticate_user(session=session, email=form_data.username, password=form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    return Token(access_token=access_token, token_type="bearer")
    
