from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import admin
from . import database
from . import models

app = FastAPI(title="Insurance CRC Admin API")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://10.24.107.34:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
models.Base.metadata.create_all(bind=database.engine)

# Include routers
app.include_router(admin.router)


@app.get("/health")
def health_check():
    return {"status": "Backend is running"}

