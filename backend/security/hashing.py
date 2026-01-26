from pwdlib import PasswordHash

def get_password_hash(password: str):
    return PasswordHash.recommended().hash(password)

def verify_password(password, hashed_password):
    return PasswordHash.recommended().verify(password, hashed_password)