export function AdBanner() {
  return (
    <div className="w-full p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
      <div className="flex flex-col items-center text-center space-y-2">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          SummarAI Pro ile Sınırsız Özet
        </h3>
        <p className="text-sm text-muted-foreground">
          Günlük limit olmadan, gelişmiş özelliklerle metinlerinizi özetleyin
        </p>
        <div className="flex items-center gap-2 text-sm">
          <span className="flex items-center text-green-600">
            <svg
              className="h-4 w-4 mr-1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            Sınırsız özet
          </span>
          <span className="flex items-center text-green-600">
            <svg
              className="h-4 w-4 mr-1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            Gelişmiş özellikler
          </span>
        </div>
      </div>
    </div>
  );
} 