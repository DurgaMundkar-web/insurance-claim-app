from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, database

app = FastAPI()

# Enable CORS so React (port 3000) can access FastAPI (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/recommendations")
def get_insurance_deals(db: Session = Depends(database.get_db)):
    try:
        deals = db.query(models.Recommendation).all()
        return deals
    except Exception as e:
        # This will send the EXACT error message to your browser
        raise HTTPException(status_code=500, detail=str(e))