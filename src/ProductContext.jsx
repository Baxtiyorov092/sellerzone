import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    // Mahsulotlarni foydalanuvchiga bog'lash uchun o'zgartirish
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      const savedProducts = localStorage.getItem(`products_${currentUser.id}`);
      return savedProducts ? JSON.parse(savedProducts) : [];
    }
    return []; // Agar foydalanuvchi bo'lmasa, bo'sh massiv qaytariladi
  });

  const [staff, setStaff] = useState(() => {
    const savedStaff = localStorage.getItem('staff');
    return savedStaff ? JSON.parse(savedStaff) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // products state o'zgarganda, foydalanuvchiga tegishli localStoragega saqlash
  useEffect(() => {
    if (user && user.id) {
      localStorage.setItem(`products_${user.id}`, JSON.stringify(products));
    }
  }, [products, user]);

  useEffect(() => {
    localStorage.setItem('staff', JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, { ...newProduct, id: Date.now() }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts((prev) => 
      prev.map((product) => (product.id === id ? { ...updatedProduct, id } : product))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const addStaff = (email, password, role = 'staff') => {
    const exists = staff.find(s => s.email === email);
    if (exists) {
      alert('Bu email bilan foydalanuvchi allaqachon mavjud!');
      return false;
    }
    const newStaff = { id: Date.now(), email, password, role };
    setStaff([...staff, newStaff]);
    return true;
  };

  const updateStaff = (id, updatedData) => {
    setStaff((prev) => 
      prev.map((member) => (member.id === id ? { ...member, ...updatedData } : member))
    );
  };

  const deleteStaff = (id) => {
    setStaff(staff.filter(s => s.id !== id));
  };

  const updateUser = (updatedData) => {
    setUser((prev) => {
      const newUser = { ...prev, ...updatedData };
      // If updating self, also update in staff list if present
      setStaff(prevStaff => prevStaff.map(s => s.email === prev.email ? { ...s, ...updatedData } : s));
      return newUser;
    });
  };

  const login = (inputEmail, inputPassword) => {
    const cleanEmail = inputEmail.trim().toLowerCase();
    const cleanPassword = inputPassword.trim();

    let foundUser = null;

    // Maxsus admin tekshiruvi
    if (cleanEmail === 'shamsiddinbaxtiyorov.092@gmail.com' && cleanPassword === 'a3022255') {
      foundUser = { 
        id: 'admin_shamsiddin', // Unikal ID
        email: cleanEmail, 
        role: 'admin', 
        password: cleanPassword, 
        name: 'Glavniy Admin' 
      };
    } else if (cleanEmail === 'admin@gmail.com' && cleanPassword === 'admin123') {
      // Default admin tekshiruvi
      foundUser = { 
        id: 'admin_default', // Unikal ID
        email: cleanEmail, 
        role: 'admin', 
        password: cleanPassword 
      };
    } else {
      // Staff (users) massividan qidirish
      foundUser = staff.find(u => 
        u.email.toLowerCase().trim() === cleanEmail && 
        u.password.trim() === cleanPassword
      );
    }

    if (foundUser) {
      const loggedInUser = { 
        id: foundUser.id,
        email: foundUser.email, 
        role: foundUser.role, 
        name: foundUser.name, 
        password: foundUser.password 
      };
      setUser(loggedInUser);

      // Foydalanuvchiga tegishli mahsulotlarni yuklash
      const userProducts = localStorage.getItem(`products_${loggedInUser.id}`);
      setProducts(userProducts ? JSON.parse(userProducts) : []);

      return loggedInUser;
    }

    // Xatoni aniqlash (Debug)
    console.log('Kiritilgan:', inputEmail, inputPassword);
    console.log('Bazadagilar (staff):', staff);

    return null;
  };

  const registerUser = (userData) => {
    const exists = staff.find(s => s.email === userData.email);
    if (exists) {
      alert('Bu email bilan foydalanuvchi allaqachon mavjud!');
      return null;
    }

    const newUserId = Date.now().toString(); // Unikal ID yaratish
    const newUser = { 
      id: newUserId, 
      email: userData.email, 
      password: userData.password, 
      role: 'staff', // Yangi ro'yxatdan o'tganlar odatda 'staff' bo'ladi
      name: `${userData.firstName} ${userData.lastName}`,
      shopCreated: true // Do'kon yaratilganligini belgilash
    };

    setStaff((prevStaff) => [...prevStaff, newUser]);
    
    // Yangi foydalanuvchi uchun bo'sh massivlarni localStoragega saqlash
    localStorage.setItem(`products_${newUserId}`, JSON.stringify([]));
    localStorage.setItem(`sales_${newUserId}`, JSON.stringify([]));
    localStorage.setItem(`history_${newUserId}`, JSON.stringify([]));

    // Foydalanuvchini avtomatik kirishga majburlash o'rniga, faqat ro'yxatdan o'tganini qaytarish
    return newUser; 
  };

  const logout = () => {
    setUser(null);
    setProducts([]); // Logout bo'lganda mahsulotlarni tozalash
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      addProduct, 
      updateProduct,
      deleteProduct,
      staff, 
      addStaff, 
      updateStaff,
      deleteStaff, 
      user, 
      updateUser,
      login, 
      logout,
      registerUser
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
