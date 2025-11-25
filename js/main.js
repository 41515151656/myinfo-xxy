// ==================== 导航栏滚动效果 ====================
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

// 监听滚动事件
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== 移动端菜单切换 ====================
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// 点击导航链接后关闭移动端菜单
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// ==================== 平滑滚动 ====================
// 只对页面内锚点链接（以#开头）应用平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // 确保是页面内锚点，不是外部链接
        if (href && href.startsWith('#') && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== 滚动指示器 ====================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// ==================== 主题切换 ====================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// 检查本地存储中的主题设置
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    if (themeToggle) {
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
}

// 主题切换功能
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        
        if (body.classList.contains('dark-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// ==================== 页面加载动画 ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==================== 滚动动画 ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.stat-card, .card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// ==================== 统计数字动画 ====================
const animateNumbers = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseFloat(stat.textContent);
        const duration = 2000; // 2秒
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                stat.textContent = current.toFixed(2);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target.toFixed(2);
            }
        };
        
        // 当元素进入视口时开始动画
        const numberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    numberObserver.unobserve(entry.target);
                }
            });
        });
        
        numberObserver.observe(stat);
    });
};

// 初始化数字动画
animateNumbers();

// ==================== 表单验证（用于联系页面） ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // 这里可以添加发送邮件的逻辑
        console.log('表单数据:', data);
        
        // 显示成功消息
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

