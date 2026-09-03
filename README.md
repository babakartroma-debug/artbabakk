# Cosmic Art Portfolio

GitHub Pages-də birbaşa işləyən, heç bir build mərhələsi olmayan artist portfolio saytıdır. Ana səhifə sakit və editorial quruluşludur; rəngli 3D qabarcığa klikləyəndə interaktiv, kosmik əsər arxivi açılır.

## GitHub Pages-də yayımlamaq

1. GitHub-da yeni repository yaradın (məsələn, `artist-portfolio`).
2. Bu qovluqdakı bütün faylları repository-nin əsasına yükləyin.
3. Repository-də **Settings → Pages** açın.
4. **Deploy from a branch** seçin, branch olaraq `main`, qovluq olaraq `/ (root)` seçin və Save edin.
5. Bir neçə dəqiqə sonra GitHub sizə sayt linkini göstərəcək.

## Öz işlərinizi qoymaq

`app.js` faylının başındakı `works` siyahısında hər əsərin adı, ili, texnikası, ölçüsü, kateqoriyası və mətni var. Hər qovluqda hazırda 30 redaktə oluna bilən demo iş var. Onları öz əsərlərinizlə bir-bir əvəz edin.

Öz şəkliniz üçün hər obyektə `image: 'assets/eser-01.jpg'` əlavə edin. Şəkilləri `assets/` qovluğuna qoyun. Faylları `01-basliq.jpg`, `02-basliq.jpg` kimi nömrələmək rahatdır.

## Ana səhifə slayderi və səs

`app.js`-də `siteMedia` hissəsinə şəkil və video əlavə edin:

```js
const siteMedia={
  slides:[
    { type:'image', src:'assets/hero-01.jpg', alt:'Studio work' },
    { type:'video', src:'assets/hero-film.mp4', alt:'Studio film', sound:true }
  ],
  backgroundAudio:'assets/ambient.mp3'
};
```

Slayderin oxları şəkil/video arasında keçir. `backgroundAudio` fotolar üçün musiqidir; “Sound on/off” düyməsi onu idarə edir. Videoda `sound:true` yazmaq videonun səsini açmağa imkan verir.

Qeyd: GitHub Pages üçün fayl adlarında boşluq və Azərbaycan hərfləri işlətməmək daha rahatdır: `eser-01.jpg` kimi yazın.

### Folder order

The collection folders are deliberately listed in the order shown on the site: Painting, Character Design (Digital & Game Art), Graphic Design, Printmaking vs Engraving, Drawing, Pastel Technique, Performance Art, Clothes Design and Photography. In `app.js`, each artwork is one simple line in the `works` list. Add your image file under `assets/`, then add its details to the matching collection. To control display order, add an `order: 1` field to an artwork object and sort by that number; use filenames such as `01-title.jpg`, `02-title.jpg` to keep files easy to manage.

## Video, music and Etsy

Create an `assets` folder beside `index.html`. Put your files there, for example `assets/hero.mp4` and `assets/music.mp3`. At the top of `app.js`, set `heroVideo: 'assets/hero.mp4'` and/or `backgroundAudio: 'assets/music.mp3'`. The sound button will appear automatically. Replace `YOUR_SHOP_NAME` in `index.html` with your Etsy shop handle.
