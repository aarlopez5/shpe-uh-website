from pydantic import EmailStr, ValidationError
from fastapi import HTTPException, status

def validate_email(email: str) -> EmailStr:
    try:
        validated_email: EmailStr = email
    except ValidationError:
        raise HTTPException(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Invalid email format"
        )
    return validated_email.lower()