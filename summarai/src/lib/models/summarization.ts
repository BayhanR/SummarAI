export interface SummarizationResponse {
    summary: string
    originalLength: number
    summaryLength: number
    compressionRatio: number
  }
  
  export async function summarizeText(text: string): Promise<SummarizationResponse> {
    // Burada gerçek bir API'ye bağlanabilirsiniz (OpenAI, Hugging Face, vb.)
    // Şimdilik basit bir özet oluşturuyoruz
  
    // API çağrısın�� simüle etmek için gecikme
    await new Promise((resolve) => setTimeout(resolve, 1500))
  
    const originalLength = text.length
  
    // Basit bir özet oluşturma (gerçek projede AI API kullanın)
    const sentences = text.split(/[.!?]+/).filter(Boolean)
    const summaryText = sentences.length > 3 ? sentences.slice(0, 3).join(". ") + "." : text
  
    const summaryLength = summaryText.length
    const compressionRatio = Math.round((1 - summaryLength / originalLength) * 100)
  
    return {
      summary: summaryText,
      originalLength,
      summaryLength,
      compressionRatio,
    }
  }
  
  