const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_CONFIG = 'LIEUTB_PLAYER'

const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const player = $('.player')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const line = $('.line')
const next = $('.btn-next')
const prev = $('.btn-prev')
const repeat = $('.btn-repeat')
const random = $('.btn-random')
const playlist = $('.playlist')
const current = $('.current')
const duration = $('.duration')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    playedSong: [],
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_CONFIG)) || {},
    setConfig: function (key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_CONFIG, JSON.stringify(this.config))
    },
    loadConfig: function () {
        this.isRepeat = this.config.isRepeat || false
        this.isRandom = this.config.isRandom || false
    },
    songs: [
        {
            image: "./assets/image/emkhacgihoa.jpg",
            path: "./assets/music/emkhacgihoa.mp3",
            name: "Em Khác Gì Hoa (Lofi Version)",
            single: "Lil Z",
        },
        {
            image: "./assets/image/anhyeuvoithe.jpg",
            path: "./assets/music/anhyeuvoithe.mp3",
            name: " Anh Yêu Vội Thế Remix",
            single: "LaLa Trần (Orinn Remix)",
        },
        {
            image: "./assets/image/anhsedonem.jpg",
            path: "./assets/music/anhsedonem.mp3",
            name: "Anh Sẽ Đón Em",
            single: "Nguyên, Trang",
        },
        {
            image: "./assets/image/mortals.jpg",
            path: "./assets/music/mortals.mp3",
            name: "Mortals",
            single: "Warriyo",
        },
        {
            image: "./assets/image/onon.jpg",
            path: "./assets/music/onon.mp3",
            name: "On & On",
            single: "Cartoon, Daniel Levi",
        },
        {
            image: "./assets/image/cauhuachuaventron.jpg",
            path: "./assets/music/CauHuaChuaVenTron-PhatHuyT4-7093319.mp3",
            name: "Câu Hứa Chưa Vẹn Tròn",
            single: "Phát Huy T4",
        },
        {
            image: "./assets/image/chayvenoiphiaanh.jpg",
            path: "./assets/music/Chay-Ve-Noi-Phia-Anh-Khac-Viet.mp3",
            name: "Chạy Về Nơi Phía Anh",
            single: "Khắc Việt",
        },
        {
            image: "./assets/image/chayvekhocvoianh.jpg",
            path: "./assets/music/Chay-Ve-Khoc-Voi-Anh-ERIK.mp3",
            name: "Chạy Về Khóc Với Anh",
            single: "ERIK",
        },
        {
            image: "./assets/image/coemday.jpg",
            path: "./assets/music/CoEmDay-NhuViet-7126614.mp3",
            name: "Có Em Đây",
            single: "Như Việt",
        },
        {
            image: "./assets/image/cuoithoi.jpg",
            path: "./assets/music/CuoiThoi-MasewMasiuBRayTAPVietNam-7085648.mp3",
            name: "Cưới Thôi",
            single: "Masew, Masiu, B Ray, TAP",
        },
        {
            image: "./assets/image/devuong.jpg",
            path: "./assets/music/DeVuong-DinhDungACV-7121634.mp3",
            name: "Đế Vương",
            single: "Đình Dũng, ACV",
        },
        {
            image: "./assets/image/hoatantinhtan.jpg",
            path: "./assets/music/HoaTanTinhTan-GiangJolee-7126977.mp3",
            name: "Hoa Tàn Tình Tan",
            single: "Giang Jolee",
        },
        {
            image: "./assets/image/ledoemxuithoi.jpg",
            path: "./assets/music/LaDoEmXuiThoi-KhoiSofiaDanTrangChauDangKhoa-7125647.mp3",
            name: "Là Do Em Xui Thôi",
            single: "Khói, Sofia, Châu Đăng Khoa",
        },
        {
            image: "./assets/image/saigondaulongqua.jpg",
            path: "./assets/music/SaiGonDauLongQua-HuaKimTuyenHoangDuyen-6992977.mp3",
            name: "Sài Gòn Đau Lòng Quá",
            single: "Hứa Kim Tuyền, Hoàng Duyên",
        },
        {
            image: "./assets/image/timduocnhaukhothenao.jpg",
            path: "./assets/music/TimDuocNhauKhoTheNaoOriginalMovieSoundtrackFromChiaKhoaTramTy-AnhTuTheVoice-7127088.mp3",
            name: "Tìm Được Nhau Khó Thế Nào",
            single: "Anh Tú",
        },
    ],
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    render: function () {
        let listSong = this.songs.map((song, index) => {
            return `<div class="song${index === this.currentIndex ? ' active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.single}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`
        })

        playlist.innerHTML = listSong.join('')
    },
    handleEvents: function () {
        const _this = this

        // get width of cd
        const cdWidth = cd.offsetWidth

        // CD thumb animation
        const cdThumbAnimate = cdThumb.animate({
            transform: 'rotate(360deg)'
        }, {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // zoom in/out CD thumb when scroll
        document.onscroll = function () {
            // lấy vị trí scroll
            let scrollTop = window.scrollY || document.documentElement.scrollTop
            let newCdWidth = cdWidth - scrollTop

            // gán width mới
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth > 0 ? newCdWidth / cdWidth : 0
        }

        // check click playBtn
        playBtn.onclick = function () {
            _this.isPlaying ? audio.pause() : audio.play()
        }

        // when audio played
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        // when audio paused
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // update progress bar and time when audio playing
        audio.ontimeupdate = function () {
            if (audio.duration) {
                progress.value = (this.currentTime / this.duration) * 100
                line.style.width = (this.currentTime / this.duration * 100) + '%'
                current.textContent = _this.formatTime(this.currentTime)
                duration.textContent = _this.formatTime(this.duration)
            }
        }

        // when ended audio
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {
                next.click()
            }
        }

        // when changed progress
        progress.oninput = function () {
            audio.currentTime = this.value * audio.duration / 100
        }

        // when click nextSong
        next.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActive()
        }

        // when click prevSong
        prev.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActive()
        }

        // when turn on/off repeatBtn
        repeat.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            audio.loop = _this.isRepeat
            this.classList.toggle('active', _this.isRepeat)
        }

        // when turn on/off randomBtn
        random.onclick = function () {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            this.classList.toggle('active', _this.isRandom)
        }

        // when choose song on playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            const option = e.target.closest('.option')

            // xử lý khi click vào songNode
            if (songNode && !option) {
                _this.currentIndex = Number(songNode.dataset.index)
                _this.loadCurrentSong()
                _this.render()
                _this.scrollToActive()
                audio.play()
            }

            // xử lý khi click vào option
            if (option) {
                console.log(option);
            }
        }
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }

        this.loadCurrentSong()
    },
    prevSong: function () {
        if (this.currentIndex <= 0) {
            this.currentIndex = this.songs.length - 1
        } else {
            this.currentIndex--
        }
        this.loadCurrentSong()
    },
    randomSong: function () {
        let newIndex

        if (this.playedSong.length === this.songs.length) {
            this.playedSong = []
        }

        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (this.playedSong.includes(newIndex) || newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.playedSong.push(newIndex)
        this.loadCurrentSong()
    },
    scrollToActive: function () {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "end",
            })
        }, 100);
    },
    formatTime: function (time) {
        let minutes = Math.floor(time / 60)
        let timeForSeconds = time - (minutes * 60)
        let seconds = Math.floor(timeForSeconds)
        let secondsReadable = seconds > 9 ? seconds : `0${seconds}`
        return `${minutes}:${secondsReadable}`
    },
    start: function () {
        // Attribute definition obj
        this.defineProperties()

        // DOM event listener
        this.handleEvents()

        // load config
        this.loadConfig()

        // show first song in CD
        this.loadCurrentSong()

        // Render playlist
        this.render()

        repeat.classList.toggle('active', this.isRepeat)
        random.classList.toggle('active', this.isRandom)
    }
}

app.start()