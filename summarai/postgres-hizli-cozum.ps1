# PostgreSQL Hızlı Çözüm Script'i
Write-Host "=== PostgreSQL Servisini Başlatma ===" -ForegroundColor Cyan
Write-Host ""

$pgPath = "C:\Program Files\PostgreSQL\18"
$binPath = "$pgPath\bin"
$dataPath = "$pgPath\data"

# 1. Data klasörü var mı kontrol et
if (-not (Test-Path $dataPath)) {
    Write-Host "❌ Data klasörü bulunamadı: $dataPath" -ForegroundColor Red
    Write-Host ""
    Write-Host "ÇÖZÜM: PostgreSQL'i yeniden kurman gerekiyor." -ForegroundColor Yellow
    Write-Host "1. https://www.postgresql.org/download/windows/ adresinden PostgreSQL 18 indir" -ForegroundColor Cyan
    Write-Host "2. İndirilen .exe dosyasını YÖNETİCİ OLARAK çalıştır" -ForegroundColor Cyan
    Write-Host "3. Kurulum sırasında 'Initialize database cluster' seçeneğinin işaretli olduğundan emin ol" -ForegroundColor Cyan
    exit
}

# 2. Servis dosyasını bul
$serviceExe = Get-ChildItem "$binPath" -Filter "pg_ctl.exe" -ErrorAction SilentlyContinue
if (-not $serviceExe) {
    Write-Host "❌ pg_ctl.exe bulunamadı!" -ForegroundColor Red
    exit
}

Write-Host "✅ PostgreSQL dosyaları bulundu" -ForegroundColor Green
Write-Host ""

# 3. Servisi başlatmayı dene
Write-Host "PostgreSQL servisini başlatmaya çalışıyorum..." -ForegroundColor Yellow

# Önce servis olarak yüklü mü kontrol et
$serviceName = "postgresql-x64-18"
$service = Get-Service -Name $serviceName -ErrorAction SilentlyContinue

if ($service) {
    Write-Host "✅ Servis bulundu: $serviceName" -ForegroundColor Green
    
    if ($service.Status -eq "Running") {
        Write-Host "✅ Servis zaten çalışıyor!" -ForegroundColor Green
    } else {
        Write-Host "Servisi başlatıyorum..." -ForegroundColor Yellow
        Start-Service -Name $serviceName -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
        
        $service.Refresh()
        if ($service.Status -eq "Running") {
            Write-Host "✅ Servis başarıyla başlatıldı!" -ForegroundColor Green
        } else {
            Write-Host "❌ Servis başlatılamadı!" -ForegroundColor Red
            Write-Host "Manuel olarak başlatmayı dene:" -ForegroundColor Yellow
            Write-Host "  services.msc → $serviceName → Start" -ForegroundColor Cyan
        }
    }
} else {
    Write-Host "⚠️  Servis Windows Services'te kayıtlı değil" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "ÇÖZÜM SEÇENEKLERİ:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. PostgreSQL'i yeniden kur (ÖNERİLEN)" -ForegroundColor Yellow
    Write-Host "   - Mevcut kurulumu kaldır" -ForegroundColor Gray
    Write-Host "   - https://www.postgresql.org/download/windows/ adresinden indir" -ForegroundColor Gray
    Write-Host "   - YÖNETİCİ OLARAK kur" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Manuel servis kaydı (İLERİ SEVİYE)" -ForegroundColor Yellow
    Write-Host "   Aşağıdaki komutu YÖNETİCİ PowerShell'de çalıştır:" -ForegroundColor Gray
    Write-Host "   `"$($serviceExe.FullName)`" register -N `"$serviceName`" -D `"$dataPath`"" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "3. Cloud Database kullan (EN KOLAY!)" -ForegroundColor Yellow
    Write-Host "   - https://supabase.com (Ücretsiz)" -ForegroundColor Gray
    Write-Host "   - https://neon.tech (Ücretsiz)" -ForegroundColor Gray
    Write-Host "   - Kurulum gerektirmez!" -ForegroundColor Gray
}

Write-Host ""
Write-Host "=== Kontrol ===" -ForegroundColor Cyan
Write-Host "Port 5432 kontrolü:" -ForegroundColor Yellow
$portCheck = netstat -an | Select-String ":5432"
if ($portCheck) {
    Write-Host "✅ Port 5432 aktif" -ForegroundColor Green
} else {
    Write-Host "❌ Port 5432 boş (PostgreSQL çalışmıyor)" -ForegroundColor Red
}

