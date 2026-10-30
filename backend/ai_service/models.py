from django.db import models
import uuid

class AIChatHistory(models.Model):
    """
    Stores conversational queries and AI agronomist responses.
    """
    id = models.CharField(max_length=64, primary_key=True, default=uuid.uuid4)
    farmer_id = models.CharField(max_length=64, blank=True, null=True, db_index=True)
    user_prompt = models.TextField(help_text="Farmer's query")
    ai_reply = models.TextField(help_text="AI agronomist response")
    language = models.CharField(max_length=10, default='mr')
    model_used = models.CharField(max_length=50, default='gemini-3.1-flash-lite')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'AI Chat Message'
        verbose_name_plural = 'AI Chat Messages'
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.language.upper()}] {self.user_prompt[:50]}... ({self.created_at.strftime('%d/%m/%Y %H:%M')})"


class CropDiagnosisLog(models.Model):
    """
    Stores leaf/fruit image disease diagnosis requests and treatments.
    """
    id = models.CharField(max_length=64, primary_key=True, default=uuid.uuid4)
    farmer_id = models.CharField(max_length=64, blank=True, null=True, db_index=True)
    crop = models.CharField(max_length=50, default='Grapes')
    diagnosis = models.TextField()
    severity = models.CharField(max_length=30, blank=True, default='Moderate')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Crop Diagnosis Log'
        verbose_name_plural = 'Crop Diagnosis Logs'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.crop} Diagnosis ({self.created_at.strftime('%d/%m/%Y %H:%M')})"
