/**
 * 恋爱记录展示网页 - 主要JavaScript文件
 * 包含所有交互逻辑和动画效果
 */

// 全局变量
let sections = document.querySelectorAll('.page-section');
let progressBar = document.getElementById('progressBar');
let music = document.getElementById('backgroundMusic');
let musicToggle = document.getElementById('musicToggle');
let musicProgress = document.getElementById('musicProgress');
let isMusicPlaying = false;
let currentSlide = 0;
let slides = document.querySelectorAll('.memory-slide');
let indicators = document.querySelectorAll('.indicator');

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化数字动画
    animateNumbers();
    
    // 初始化音乐
    initMusic();
    
    // 初始化滚动监听
    initScrollListeners();
    
    // 初始化键盘控制
    initKeyboardControl();
    
    // 初始化时间线动画
    initTimelineAnimation();
    
    // 初始化数据卡片动画
    initDataCardsAnimation();
    
    // 初始化回忆滑块
    initMemorySlider();
    
    // 初始化总结卡片动画
    initSummaryCardsAnimation();
});

/**
 * 数字动画函数
 */
function animateNumbers() {
    const daysCount = document.getElementById('daysCount');
    const messagesCount = document.getElementById('messagesCount');
    const memoriesCount = document.getElementById('memoriesCount');
    
    const targetDays = 730; // 假设恋爱了730天
    const targetMessages = 52580; // 假设发送了52580条消息
    const targetMemories = 127; // 假设创造了127个回忆
    
    let currentDays = 0;
    let currentMessages = 0;
    let currentMemories = 0;
    
    const daysInterval = setInterval(() => {
        currentDays += 10;
        if (currentDays >= targetDays) {
            currentDays = targetDays;
            clearInterval(daysInterval);
        }
        daysCount.textContent = currentDays.toLocaleString();
    }, 50);
    
    const messagesInterval = setInterval(() => {
        currentMessages += 500;
        if (currentMessages >= targetMessages) {
            currentMessages = targetMessages;
            clearInterval(messagesInterval);
        }
        messagesCount.textContent = currentMessages.toLocaleString();
    }, 50);
    
    const memoriesInterval = setInterval(() => {
        currentMemories += 2;
        if (currentMemories >= targetMemories) {
            currentMemories = targetMemories;
            clearInterval(memoriesInterval);
        }
        memoriesCount.textContent = currentMemories.toLocaleString();
    }, 100);
}

/**
 * 音乐相关函数
 */
function initMusic() {
    // 尝试自动播放音乐
    music.play().catch(error => {
        console.log('无法自动播放音乐:', error);
    });
    
    // 监听音乐播放事件
    music.addEventListener('play', function() {
        isMusicPlaying = true;
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    });
    
    // 监听音乐暂停事件
    music.addEventListener('pause', function() {
        isMusicPlaying = false;
        musicToggle.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    // 监听音乐时间更新事件
    music.addEventListener('timeupdate', function() {
        let progress = (music.currentTime / music.duration) * 100;
        musicProgress.style.width = progress + '%';
    });
}

function toggleMusic() {
    if (isMusicPlaying) {
        music.pause();
    } else {
        music.play();
    }
}

/**
 * 滚动相关函数
 */
function initScrollListeners() {
    window.addEventListener('scroll', function() {
        // 更新进度条
        let scrollTop = window.scrollY;
        let docHeight = document.documentElement.scrollHeight - window.innerHeight;
        let scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
        
        // 检查元素是否可见并触发动画
        checkTimelineVisibility();
        checkDataCardsVisibility();
        checkSummaryCardsVisibility();
    });
}

function scrollToSection(sectionId) {
    let section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

/**
 * 键盘控制函数
 */
function initKeyboardControl() {
    document.addEventListener('keydown', function(e) {
        let currentSectionIndex = getCurrentSectionIndex();
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            // 下一页
            if (currentSectionIndex < sections.length - 1) {
                sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            // 上一页
            if (currentSectionIndex > 0) {
                sections[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
            }
        } else if (e.key === ' ') {
            // 空格键切换音乐播放/暂停
            e.preventDefault();
            toggleMusic();
        }
    });
}

function getCurrentSectionIndex() {
    let scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (let i = 0; i < sections.length; i++) {
        let sectionTop = sections[i].offsetTop;
        let sectionBottom = sectionTop + sections[i].offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            return i;
        }
    }
    
    return 0;
}

/**
 * 时间线动画函数
 */
function initTimelineAnimation() {
    checkTimelineVisibility();
}

function checkTimelineVisibility() {
    let timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        let itemTop = item.getBoundingClientRect().top;
        let itemBottom = item.getBoundingClientRect().bottom;
        
        if (itemTop < window.innerHeight * 0.8 && itemBottom > 0) {
            item.classList.add('visible');
        }
    });
}

/**
 * 数据卡片动画函数
 */
function initDataCardsAnimation() {
    checkDataCardsVisibility();
}

function checkDataCardsVisibility() {
    let dataCards = document.querySelectorAll('.data-card');
    
    dataCards.forEach(card => {
        let cardTop = card.getBoundingClientRect().top;
        let cardBottom = card.getBoundingClientRect().bottom;
        
        if (cardTop < window.innerHeight * 0.8 && cardBottom > 0) {
            card.classList.add('visible');
        }
    });
}

/**
 * 回忆滑块函数
 */
function initMemorySlider() {
    showSlide(currentSlide);
}

function showSlide(index) {
    // 隐藏所有幻灯片
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // 移除所有指示器的活动状态
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // 显示当前幻灯片和指示器
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    // 更新当前幻灯片索引
    currentSlide = index;
}

function changeSlide(direction) {
    let newIndex = currentSlide + direction;
    
    // 循环播放
    if (newIndex >= slides.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = slides.length - 1;
    }
    
    showSlide(newIndex);
}

function goToSlide(index) {
    showSlide(index);
}

/**
 * 总结卡片动画函数
 */
function initSummaryCardsAnimation() {
    checkSummaryCardsVisibility();
}

function checkSummaryCardsVisibility() {
    let summaryCards = document.querySelectorAll('.summary-card');
    let futureWishes = document.querySelector('.future-wishes');
    
    summaryCards.forEach(card => {
        let cardTop = card.getBoundingClientRect().top;
        let cardBottom = card.getBoundingClientRect().bottom;
        
        if (cardTop < window.innerHeight * 0.8 && cardBottom > 0) {
            card.classList.add('visible');
        }
    });
    
    if (futureWishes) {
        let wishesTop = futureWishes.getBoundingClientRect().top;
        let wishesBottom = futureWishes.getBoundingClientRect().bottom;
        
        if (wishesTop < window.innerHeight * 0.8 && wishesBottom > 0) {
            futureWishes.classList.add('visible');
        }
    }
}

/**
 * 图片模态框函数
 */
function openModal(imageSrc) {
    let modal = document.getElementById('imageModal');
    let modalImage = document.getElementById('modalImage');
    
    modal.style.display = 'flex';
    modalImage.src = imageSrc;
    
    // 添加动画类
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    let modal = document.getElementById('imageModal');
    
    // 移除动画类
    modal.classList.remove('show');
    
    // 等待动画完成后隐藏模态框
    setTimeout(() => {
        modal.style.display = 'none';
        // 恢复背景滚动
        document.body.style.overflow = 'auto';
    }, 300);
}

// 点击模态框外部关闭
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// 按ESC键关闭模态框
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});