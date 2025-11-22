# PostgreSQL Durum Kontrol Script'i
Write-Host "=== PostgreSQL Durum Kontrolü ===" -ForegroundColor Cyan
Write-Host ""

# 1. PostgreSQL Servislerini Kontrol Et
Write-Host "1. PostgreSQL Servisleri:" -ForegroundColor Yellow
$services = Get-Service -Name "*postgres*" -ErrorAction SilentlyContinue
if ($services) {
    foreach ($service in $services) {
        $status = if ($service.Status -eq "Running") { "✅ ÇALIŞIYOR" } else { "❌ DURDURULMUŞ" }
        Write-Host "   $($service.Name): $status" -ForegroundColor $(if ($service.Status -eq "Running") { "Green" } else { "Red" })
    }
} else {
    Write-Host "   ❌ PostgreSQL servisi bulunamadı!" -ForegroundColor Red
}

Write-Host ""

# 2. Port Kontrolü
Write-Host "2. Port 5432 Kontrolü:" -ForegroundColor Yellow
$portCheck = netstat -an | Select-String ":5432"
if ($portCheck) {
    Write-Host "   ✅ Port 5432 kullanımda" -ForegroundColor Green
    Write-Host "   Detay: $($portCheck.Line)"
} else {
    Write-Host "   ❌ Port 5432 boş (PostgreSQL çalışmıyor olabilir)" -ForegroundColor Red
}

Write-Host ""

# 3. PostgreSQL Klasör Kontrolü
Write-Host "3. PostgreSQL Kurulum Klasörleri:" -ForegroundColor Yellow
$pgPaths = @(
    "C:\Program Files\PostgreSQL",
    "C:\Program Files (x86)\PostgreSQL"
)

$found = $false
foreach ($path in $pgPaths) {
    if (Test-Path $path) {
        Write-Host "   ✅ Bulundu: $path" -ForegroundColor Green
        $versions = Get-ChildItem $path -Directory -ErrorAction SilentlyContinue
        foreach ($version in $versions) {
            Write-Host "      - $($version.Name)" -ForegroundColor Gray
        }
        $found = $true
    }
}

if (-not $found) {
    Write-Host "   ❌ PostgreSQL klasörü bulunamadı!" -ForegroundColor Red
}

Write-Host ""

# 4. psql Komutu Kontrolü
Write-Host "4. psql Komutu:" -ForegroundColor Yellow
$psqlPaths = @(
    "C:\Program Files\PostgreSQL\16\bin\psql.exe",
    "C:\Program Files\PostgreSQL\15\bin\psql.exe",
    "C:\Program Files\PostgreSQL\14\bin\psql.exe"
)

$psqlFound = $false
foreach ($psqlPath in $psqlPaths) {
    if (Test-Path $psqlPath) {
        Write-Host "   ✅ psql bulundu: $psqlPath" -ForegroundColor Green
        $psqlFound = $true
        break
    }
}

if (-not $psqlFound) {
    Write-Host "   ❌ psql.exe bulunamadı!" -ForegroundColor Red
}

Write-Host ""

# 5. Bağlantı Testi
Write-Host "5. Bağlantı Testi:" -ForegroundColor Yellow
if ($psqlFound) {
    Write-Host "   Bağlantı testi için şu komutu çalıştır:" -ForegroundColor Gray
    Write-Host "   .\psql.exe -U postgres -d postgres" -ForegroundColor Cyan
} else {
    Write-Host "   ❌ psql bulunamadığı için test edilemiyor" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Kontrol Tamamlandı ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Sorun varsa POSTGRESQL_KURULUM_REHBERI.md dosyasına bak!" -ForegroundColor Yellow

