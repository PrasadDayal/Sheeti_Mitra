from django.contrib import admin
from .models import AIChatHistory, CropDiagnosisLog

@admin.register(AIChatHistory)
class AIChatHistoryAdmin(admin.ModelAdmin):
    list_display = ('user_prompt_snippet', 'language', 'model_used', 'created_at')
    list_filter = ('language', 'model_used', 'created_at')
    search_fields = ('user_prompt', 'ai_reply', 'farmer_id')
    readonly_fields = ('created_at',)

    def user_prompt_snippet(self, obj):
        return obj.user_prompt[:70] + ('...' if len(obj.user_prompt) > 70 else '')
    user_prompt_snippet.short_description = 'शेतकऱ्याचा प्रश्न (Question)'


@admin.register(CropDiagnosisLog)
class CropDiagnosisLogAdmin(admin.ModelAdmin):
    list_display = ('crop', 'severity', 'diagnosis_snippet', 'created_at')
    list_filter = ('crop', 'severity', 'created_at')
    search_fields = ('crop', 'diagnosis', 'farmer_id')
    readonly_fields = ('created_at',)

    def diagnosis_snippet(self, obj):
        return obj.diagnosis[:70] + ('...' if len(obj.diagnosis) > 70 else '')
    diagnosis_snippet.short_description = 'निदान (Diagnosis)'
