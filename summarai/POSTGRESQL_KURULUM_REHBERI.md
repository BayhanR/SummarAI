# PostgreSQL Kurulum ve Sorun Giderme Rehberi (Windows)

## 🔧 Sorun: PostgreSQL Kurulumu Başarısız veya pgAdmin'de Server Görünmüyor

### Adım 1: Mevcut Kurulumu Temizle

1. **PostgreSQL Servislerini Durdur:**
   - Windows + R → `services.msc` yaz
   - `postgresql` ile başlayan servisleri bul
   - Sağ tık → Stop (Durdur)
   - Sağ tık → Properties → Startup type: Disabled

2. **PostgreSQL'i Kaldır:**
   - Windows Ayarlar → Uygulamalar → PostgreSQL'i bul ve Kaldır
   - VEYA Control Panel → Programs → PostgreSQL'i kaldır

3. **Klasörleri Temizle:**
   ```
   C:\Program Files\PostgreSQL
   C:\Program Files (x86)\PostgreSQL
   C:\Users\[KullanıcıAdı]\AppData\Local\PostgreSQL
   C:\Users\[KullanıcıAdı]\AppData\Roaming\pgAdmin
   ```

### Adım 2: Yeni Kurulum (Önerilen: PostgreSQL 16)

1. **İndir:**
   - https://www.postgresql.org/download/windows/
   - "Download the installer" → Windows x86-64
   - VEYA direkt: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

2. **Kurulum Adımları:**
   - İndirilen `.exe` dosyasını **Yönetici olarak çalıştır** (sağ tık → Run as administrator)
   - Next → Next → **Port: 5432** (varsayılan)
   - **Superuser Password:** Güçlü bir şifre belirle (unutma!)
   - **Locale:** Turkish, Turkey (veya English)
   - Next → Next → **Stack Builder'ı işaretleme** (gerek yok)
   - Finish

3. **Kurulum Sonrası Kontrol:**
   - Windows + R → `services.msc`
   - `postgresql-x64-16` (veya kurduğun versiyon) servisinin **Running** olduğunu kontrol et

### Adım 3: pgAdmin Sorunlarını Çöz

**Sorun: pgAdmin'de Server görünmüyor**

1. **pgAdmin'i Aç:**
   - Başlat menüsünden "pgAdmin 4" ara ve aç
   - İlk açılışta master password isteyebilir (kaydet!)

2. **Manuel Server Ekle:**
   - Sol panelde "Servers" → Sağ tık → Register → Server
   - **General tab:**
     - Name: `Local PostgreSQL` (istediğin isim)
   - **Connection tab:**
     - Host name/address: `localhost`
     - Port: `5432`
     - Maintenance database: `postgres`
     - Username: `postgres`
     - Password: Kurulumda belirlediğin şifre
   - **Save password** işaretle
   - Save

3. **Hala Bağlanamıyorsan:**
   - Windows + R → `services.msc`
   - PostgreSQL servisini bul → Sağ tık → Restart
   - pgAdmin'i kapat ve tekrar aç

### Adım 4: Veritabanı Oluştur

1. **pgAdmin'de:**
   - Servers → Local PostgreSQL → Databases → Sağ tık → Create → Database
   - Database name: `summarai`
   - Owner: `postgres`
   - Save

2. **VEYA Komut Satırından:**
   ```powershell
   # PostgreSQL bin klasörüne git
   cd "C:\Program Files\PostgreSQL\16\bin"
   
   # psql ile bağlan
   .\psql.exe -U postgres
   
   # Şifre gir, sonra:
   CREATE DATABASE summarai;
   \q
   ```

### Adım 5: .env Dosyasını Güncelle

`summarai/.env` dosyasında:

```env
POSTGRES_PRISMA_URL="postgresql://postgres:ŞİFREN_BURAYA@localhost:5432/summarai?schema=public"
POSTGRES_URL_NON_POOLING="postgresql://postgres:ŞİFREN_BURAYA@localhost:5432/summarai?schema=public"
```

**ÖNEMLİ:** `ŞİFREN_BURAYA` yerine kurulumda belirlediğin şifreyi yaz!

### Adım 6: Prisma Migration Çalıştır

```powershell
cd summarai
npx prisma migrate dev
```

---

## 🚨 Hala Sorun Varsa: Alternatif Çözümler

### Seçenek 1: Cloud Database (Önerilen - Kolay!)

**Supabase (Ücretsiz):**
1. https://supabase.com → Sign Up
2. New Project → Database oluştur
3. Settings → Database → Connection string kopyala
4. `.env` dosyasına yapıştır

**Neon (Ücretsiz):**
1. https://neon.tech → Sign Up
2. Create Project
3. Connection string kopyala
4. `.env` dosyasına yapıştır

**Avantajları:**
- ✅ Kurulum yok
- ✅ Ücretsiz tier var
- ✅ Otomatik backup
- ✅ Her yerden erişim

### Seçenek 2: Portable PostgreSQL

Eğer kurulum sorunları devam ederse, portable versiyon kullan:

1. **Portable PostgreSQL İndir:**
   - https://github.com/garethflowers/postgresql-portable/releases
   - VEYA: https://www.postgresql.org/download/windows/ → "One Click Installer"

2. **Kurulum:**
   - İndir → Çalıştır → Klasöre çıkar
   - `initdb.exe` çalıştır (veritabanı başlat)
   - `pg_ctl.exe start` (servis başlat)

---

## 🔍 Yaygın Hatalar ve Çözümleri

### Hata: "Port 5432 already in use"
```powershell
# Port'u kullanan process'i bul
netstat -ano | findstr :5432

# Process ID'yi not al, sonra:
taskkill /PID [PROCESS_ID] /F
```

### Hata: "Password authentication failed"
- pgAdmin'de şifreyi tekrar gir
- VEYA PostgreSQL şifresini sıfırla:
```powershell
cd "C:\Program Files\PostgreSQL\16\bin"
.\psql.exe -U postgres
ALTER USER postgres PASSWORD 'yeni_sifre';
```

### Hata: "Service failed to start"
- Windows Event Viewer'ı kontrol et
- PostgreSQL log dosyalarını kontrol et: `C:\Program Files\PostgreSQL\16\data\log`

---

## ✅ Başarı Kontrolü

Kurulum başarılı mı kontrol et:

```powershell
# PostgreSQL servisi çalışıyor mu?
Get-Service -Name "*postgres*"

# Port dinleniyor mu?
netstat -an | findstr :5432

# psql ile bağlanabiliyor musun?
cd "C:\Program Files\PostgreSQL\16\bin"
.\psql.exe -U postgres -d postgres
```

Bağlanabiliyorsan → `\q` yazıp çık, sonra Prisma migration çalıştır!

---

## 💡 İpucu

Eğer hala sorun yaşıyorsan, **Supabase veya Neon** kullanmanı öneririm. 
Kurulum gerektirmez, ücretsiz tier'ları var ve çok kolay!

