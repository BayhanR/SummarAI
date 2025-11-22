# PostgreSQL Servisini Manuel Kaydetme
# BU SCRIPT'İ YÖNETİCİ OLARAK ÇALIŞTIR!

Write-Host "=== PostgreSQL Servis Kaydı ===" -ForegroundColor Cyan
Write-Host ""

# Yönetici kontrolü
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "❌ Bu script YÖNETİCİ OLARAK çalıştırılmalı!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Nasıl yapılır:" -ForegroundColor Yellow
    Write-Host "1. PowerShell'i kapat" -ForegroundColor Cyan
    Write-Host "2. Başlat menüsünde 'PowerShell' ara" -ForegroundColor Cyan
    Write-Host "3. 'Windows PowerShell' üzerine sağ tık → 'Run as administrator'" -ForegroundColor Cyan
    Write-Host "4. Bu script'i tekrar çalıştır" -ForegroundColor Cyan
    exit
}

Write-Host "✅ Yönetici yetkisi var" -ForegroundColor Green
Write-Host ""

$pgPath = "C:\Program Files\PostgreSQL\18"
$binPath = "$pgPath\bin"
$dataPath = "$pgPath\data"

# Klasör kontrolü
if (-not (Test-Path $binPath)) {
    Write-Host "❌ PostgreSQL bin klasörü bulunamadı: $binPath" -ForegroundColor Red
    exit
}

if (-not (Test-Path $dataPath)) {
    Write-Host "❌ Data klasörü bulunamadı: $dataPath" -ForegroundColor Red
    Write-Host ""
    Write-Host "Data klasörü yoksa PostgreSQL'i yeniden kurman gerekiyor." -ForegroundColor Yellow
    exit
}

$pgCtl = "$binPath\pg_ctl.exe"
$serviceName = "postgresql-x64-18"

Write-Host "PostgreSQL servisini kaydediyorum..." -ForegroundColor Yellow
Write-Host "  Servis adı: $serviceName" -ForegroundColor Gray
Write-Host "  Data path: $dataPath" -ForegroundColor Gray
Write-Host ""

# Servis kaydı
try {
    & $pgCtl register -N $serviceName -D $dataPath
    
    Write-Host "✅ Servis başarıyla kaydedildi!" -ForegroundColor Green
    Write-Host ""
    
    # Servisi başlat
    Write-Host "Servisi başlatıyorum..." -ForegroundColor Yellow
    Start-Service -Name $serviceName -ErrorAction Stop
    
    Start-Sleep -Seconds 2
    $service = Get-Service -Name $serviceName
    if ($service.Status -eq "Running") {
        Write-Host "✅ Servis başarıyla başlatıldı!" -ForegroundColor Green
        Write-Host ""
        Write-Host "PostgreSQL artık çalışıyor! 🎉" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Test etmek için:" -ForegroundColor Yellow
        Write-Host "  cd `"$binPath`"" -ForegroundColor Cyan
        Write-Host "  .\psql.exe -U postgres" -ForegroundColor Cyan
    } else {
        Write-Host "⚠️  Servis kaydedildi ama başlatılamadı" -ForegroundColor Yellow
        Write-Host "Manuel olarak başlat: services.msc → $serviceName → Start" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ Hata: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Alternatif çözüm:" -ForegroundColor Yellow
    Write-Host "PostgreSQL'i yeniden kur (önerilen)" -ForegroundColor Cyan
}

