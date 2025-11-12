  
        // Mahsulotlar ma'lumotlari (localStorage dan olinadi)
        let products = JSON.parse(localStorage.getItem('products')) || [
            {
                id: 1,
                title: "iPhone 13 Pro",
                description: "Yangi holatda, 128GB, qora rang. Barcha aksessuarlar bilan.",
                price: 8000000,
                category: "phones",
                location: "Toshkent",
                phone: "+998 90 123 45 67",
                image: "https://images.unsplash.com/photo-1632661674596-618e45e56c53?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                date: "2024-01-15",
                seller: "Ali Valiyev"
            },
            {
                id: 2,
                title: "MacBook Air M1",
                description: "2020 yil, 8GB RAM, 256GB SSD. Ajoyib holatda.",
                price: 7500000,
                category: "laptops",
                location: "Samarqand",
                phone: "+998 91 234 56 78",
                image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                date: "2024-01-14",
                seller: "Dilshod Rahimov"
            },
            {
                id: 3,
                title: "Samsung Galaxy S21",
                description: "Oq rang, 256GB, 1 yil garantiya qolgan.",
                price: 4500000,
                category: "phones",
                location: "Buxoro",
                phone: "+998 93 345 67 89",
                image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                date: "2024-01-13",
                seller: "Sardor Qodirov"
            },
            {
                id: 4,
                title: "Nike Air Jordan",
                description: "42 o'lcham, yangi, quti bilan.",
                price: 850000,
                category: "clothing",
                location: "Toshkent",
                phone: "+998 94 456 78 90",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                date: "2024-01-12",
                seller: "Javohir Rasulov"
            },
            {
                id: 5,
                title: "Sovutgich Artel",
                description: "220 litr, ishlagan holatda, tez sotiladi.",
                price: 2500000,
                category: "home",
                location: "Andijon",
                phone: "+998 95 567 89 01",
                image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                date: "2024-01-11",
                seller: "Shohruh To'xtayev"
            },
            {
                id: 6,
                title: "Kitoblar to'plami",
                description: "100 ta turli janrdagi kitoblar. Hammasi yangi.",
                price: 500000,
                category: "books",
                location: "Farg'ona",
                phone: "+998 97 789 01 23",
                image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                date: "2024-01-10",
                seller: "Zarina Xolmatova"
            }
        ];

        // Savat ma'lumotlari
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Chat ma'lumotlari
        let currentChatProduct = null;
        let messages = JSON.parse(localStorage.getItem('messages')) || {};

        // Sahifa yuklanganda mahsulotlarni ko'rsatish
        document.addEventListener('DOMContentLoaded', function() {
            displayProducts();
            updateCartCount();
        });

        // Mahsulotlarni ekranga chiqarish
        function displayProducts() {
            const container = document.getElementById('productsContainer');
            container.innerHTML = '';

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <div class="product-info">
                        <div class="product-title">${product.title}</div>
                        <div class="product-price">${product.price.toLocaleString()} UZS</div>
                        <div class="product-location">📍 ${product.location}</div>
                        <div class="product-date">${formatDate(product.date)}</div>
                    </div>
                `;
                
                // Mahsulotni bosganda tafsilotlarni ko'rsatish
                productCard.addEventListener('click', () => {
                    openProductDetailModal(product);
                });
                
                container.appendChild(productCard);
            });
        }

        // Sana formatlash
        function formatDate(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) return "Kecha";
            if (diffDays === 2) return "2 kun oldin";
            if (diffDays <= 7) return `${diffDays} kun oldin`;
            
            return date.toLocaleDateString('uz-UZ');
        }

        // Modalni ochish
        function openAddProductModal() {
            document.getElementById('addProductModal').style.display = 'flex';
        }

        // Modalni yopish
        function closeAddProductModal() {
            document.getElementById('addProductModal').style.display = 'none';
            document.getElementById('addProductForm').reset();
        }

        // Mahsulot tafsilotlari modalini ochish
        function openProductDetailModal(product) {
            const modalContent = document.getElementById('productDetailContent');
            modalContent.innerHTML = `
                <div>
                    <img src="${product.image}" alt="${product.title}" class="product-detail-image">
                </div>
                <div class="product-detail-info">
                    <h1>${product.title}</h1>
                    <div class="product-detail-price">${product.price.toLocaleString()} UZS</div>
                    <div class="product-detail-description">${product.description}</div>
                    <div class="product-detail-meta">
                        <div><strong>📍 Manzil:</strong> ${product.location}</div>
                        <div><strong>📞 Telefon:</strong> ${product.phone}</div>
                        <div><strong>👤 Sotuvchi:</strong> ${product.seller}</div>
                        <div><strong>📅 E'lon sanasi:</strong> ${formatDate(product.date)}</div>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary btn-large" onclick="addToCart(${product.id})">Savatga qo'shish</button>
                        <button class="btn btn-outline btn-large" onclick="openChatModal(${product.id})">Sotuvchi bilan yozish</button>
                    </div>
                </div>
            `;
            document.getElementById('productDetailModal').style.display = 'flex';
        }

        // Mahsulot tafsilotlari modalini yopish
        function closeProductDetailModal() {
            document.getElementById('productDetailModal').style.display = 'none';
        }

        // Savat modalini ochish
        function openCartModal() {
            updateCartDisplay();
            document.getElementById('cartModal').style.display = 'flex';
        }

        // Savat modalini yopish
        function closeCartModal() {
            document.getElementById('cartModal').style.display = 'none';
        }

        // Savatni yangilash
        function updateCartDisplay() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            
            cartItems.innerHTML = '';
            let total = 0;
            
            cart.forEach(item => {
                const product = products.find(p => p.id === item.productId);
                if (product) {
                    total += product.price * item.quantity;
                    
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');
                    cartItem.innerHTML = `
                        <img src="${product.image}" alt="${product.title}" class="cart-item-image">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${product.title}</div>
                            <div class="cart-item-price">${product.price.toLocaleString()} UZS</div>
                            <div>Soni: ${item.quantity}</div>
                        </div>
                        <button class="btn btn-outline" onclick="removeFromCart(${item.productId})">O'chirish</button>
                    `;
                    cartItems.appendChild(cartItem);
                }
            });
            
            cartTotal.textContent = `${total.toLocaleString()} UZS`;
        }

        // Savatga mahsulot qo'shish
        function addToCart(productId) {
            const existingItem = cart.find(item => item.productId === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    productId: productId,
                    quantity: 1
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            closeProductDetailModal();
            alert('Mahsulot savatga qo\'shildi!');
        }

        // Savatdan mahsulotni o'chirish
        function removeFromCart(productId) {
            cart = cart.filter(item => item.productId !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            updateCartCount();
        }

        // Savatdagi mahsulotlar sonini yangilash
        function updateCartCount() {
            const cartButton = document.querySelector('.btn-outline');
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            
            if (totalItems > 0) {
                cartButton.textContent = `Savat (${totalItems})`;
            } else {
                cartButton.textContent = 'Savat';
            }
        }

        // Chat modalini ochish
        function openChatModal(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            currentChatProduct = product;
            document.getElementById('chatSellerName').textContent = `${product.seller} bilan suhbat`;
            
            // Chat xabarlarini yuklash
            const chatId = `chat_${productId}`;
            if (!messages[chatId]) {
                messages[chatId] = [
                    {
                        text: "Assalomu alaykum! Ushbu mahsulot haqida qo'shimcha ma'lumot olishim mumkinmi?",
                        sender: "user",
                        time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
                    },
                    {
                        text: "Assalomu alaykum! Albatta, qanday savolingiz bor?",
                        sender: "seller",
                        time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
                    }
                ];
                localStorage.setItem('messages', JSON.stringify(messages));
            }
            
            displayChatMessages(chatId);
            document.getElementById('chatModal').style.display = 'flex';
            closeProductDetailModal();
        }

        // Chat modalini yopish
        function closeChatModal() {
            document.getElementById('chatModal').style.display = 'none';
            currentChatProduct = null;
        }

        // Chat xabarlarini ko'rsatish
        function displayChatMessages(chatId) {
            const chatMessages = document.getElementById('chatMessages');
            chatMessages.innerHTML = '';
            
            if (messages[chatId]) {
                messages[chatId].forEach(message => {
                    const messageDiv = document.createElement('div');
                    messageDiv.classList.add('message');
                    messageDiv.classList.add(message.sender === 'user' ? 'sent' : 'received');
                    messageDiv.innerHTML = `
                        <div>${message.text}</div>
                        <div style="font-size: 10px; text-align: ${message.sender === 'user' ? 'right' : 'left'}; margin-top: 5px;">${message.time}</div>
                    `;
                    chatMessages.appendChild(messageDiv);
                });
            }
            
            // Pastga aylantirish
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Xabar yuborish
        function sendMessage() {
            const input = document.getElementById('chatInput');
            const messageText = input.value.trim();
            
            if (!messageText || !currentChatProduct) return;
            
            const chatId = `chat_${currentChatProduct.id}`;
            
            // Yangi xabarni qo'shish
            const newMessage = {
                text: messageText,
                sender: "user",
                time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
            };
            
            messages[chatId].push(newMessage);
            localStorage.setItem('messages', JSON.stringify(messages));
            
            // Xabarni ko'rsatish
            displayChatMessages(chatId);
            
            // Inputni tozalash
            input.value = '';
            
            // Sotuvchining javobini simulyatsiya qilish
            setTimeout(() => {
                const responses = [
                    "Qo'shimcha ma'lumot kerak bo'lsa, so'rashingiz mumkin.",
                    "Mahsulot haqida batafsil ma'lumot berishim mumkin.",
                    "Narx bo'yicha kelishish imkoniyati bor.",
                    "Mahsulotni ko'rib chiqish uchun kelishingiz mumkin."
                ];
                
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                
                const sellerMessage = {
                    text: randomResponse,
                    sender: "seller",
                    time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
                };
                
                messages[chatId].push(sellerMessage);
                localStorage.setItem('messages', JSON.stringify(messages));
                displayChatMessages(chatId);
            }, 2000);
        }

        // Enter tugmasi bosilganda xabar yuborish
        function handleChatKeypress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        // Buyurtma berish
        function checkout() {
            if (cart.length === 0) {
                alert('Savat bo\'sh!');
                return;
            }
            
            const total = cart.reduce((sum, item) => {
                const product = products.find(p => p.id === item.productId);
                return sum + (product ? product.price * item.quantity : 0);
            }, 0);
            
            alert(`Buyurtma qabul qilindi! Jami summa: ${total.toLocaleString()} UZS\nTez orada siz bilan bog'lanamiz.`);
            
            // Savatni tozalash
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            closeCartModal();
        }

        // Yangi mahsulot qo'shish
        document.getElementById('addProductForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('productTitle').value;
            const description = document.getElementById('productDescription').value;
            const price = parseInt(document.getElementById('productPrice').value);
            const category = document.getElementById('productCategory').value;
            const location = document.getElementById('productLocation').value;
            const phone = document.getElementById('productPhone').value;
            const imageFile = document.getElementById('productImage').files[0];
            
            if (!imageFile) {
                alert('Iltimos, mahsulot uchun rasm yuklang!');
                return;
            }
            
            // Rasmni URL ga aylantirish
            const reader = new FileReader();
            reader.onload = function(e) {
                const newProduct = {
                    id: Date.now(),
                    title,
                    description,
                    price,
                    category,
                    location,
                    phone,
                    seller: "Siz", // Yangi mahsulot qo'shgan foydalanuvchi
                    image: e.target.result,
                    date: new Date().toISOString().split('T')[0]
                };
                
                products.unshift(newProduct);
                localStorage.setItem('products', JSON.stringify(products));
                displayProducts();
                closeAddProductModal();
                alert('Mahsulot muvaffaqiyatli qo\'shildi!');
            };
            reader.readAsDataURL(imageFile);
        });

        // Tashqi modalni yopish
        window.addEventListener('click', function(e) {
            const modals = ['addProductModal', 'productDetailModal', 'cartModal', 'chatModal'];
            modals.forEach(modalId => {
                const modal = document.getElementById(modalId);
                if (e.target === modal) {
                    if (modalId === 'addProductModal') closeAddProductModal();
                    if (modalId === 'productDetailModal') closeProductDetailModal();
                    if (modalId === 'cartModal') closeCartModal();
                    if (modalId === 'chatModal') closeChatModal();
                }
            });
        });
    