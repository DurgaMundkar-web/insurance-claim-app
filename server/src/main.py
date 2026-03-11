from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, database

app = FastAPI()

# Enable CORS so React (port 3000) can access FastAPI (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_origins=["*"],
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

<<<<<<< HEAD
@app.get("/api/recommendations")
def get_insurance_deals(db: Session = Depends(database.get_db)):
    try:
        deals = db.query(models.Recommendation).all()
        return deals
    except Exception as e:
        # This will send the EXACT error message to your browser
        raise HTTPException(status_code=500, detail=str(e))
=======
<<<<<<< HEAD
app.include_router(auth_router)
app.include_router(users_router)

@app.get("/")
def root():
    return {"message": "FastAPI running"}
=======
@app.get("/health")
def health_check():
    return {"status": "Backend is running"}

>>>>>>> 9ebdf3ebc0e951d44b538f0d30d83c7bef023b2f
>>>>>>> main-group-A
