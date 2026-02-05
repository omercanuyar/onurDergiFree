import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  ARTICLES: 'onurdergi_articles',
  MAGAZINES: 'onurdergi_magazines'
};

export const DataProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const storedArticles = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      const storedMagazines = localStorage.getItem(STORAGE_KEYS.MAGAZINES);
      
      if (storedArticles) {
        setArticles(JSON.parse(storedArticles));
      }
      if (storedMagazines) {
        setMagazines(JSON.parse(storedMagazines));
      }
    } catch (error) {
      console.error('Veri yükleme hatası:', error);
    }
  };

  const saveArticles = (newArticles) => {
    try {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(newArticles));
      setArticles(newArticles);
    } catch (error) {
      console.error('Yazı kaydetme hatası:', error);
    }
  };

  const saveMagazines = (newMagazines) => {
    try {
      localStorage.setItem(STORAGE_KEYS.MAGAZINES, JSON.stringify(newMagazines));
      setMagazines(newMagazines);
    } catch (error) {
      console.error('Dergi kaydetme hatası:', error);
    }
  };

  const addArticle = (article) => {
    const newArticle = {
      ...article,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const newArticles = [newArticle, ...articles];
    saveArticles(newArticles);
    return newArticle;
  };

  const updateArticle = (id, updates) => {
    const newArticles = articles.map(article => 
      article.id === id 
        ? { ...article, ...updates, updatedAt: new Date().toISOString() }
        : article
    );
    saveArticles(newArticles);
  };

  const deleteArticle = (id) => {
    const newArticles = articles.filter(article => article.id !== id);
    saveArticles(newArticles);
  };

  const getArticleById = (id) => {
    return articles.find(article => article.id === id);
  };

  const getPublishedArticles = () => {
    return articles.filter(article => article.isPublished);
  };

  const addMagazine = (magazine) => {
    const newMagazine = {
      ...magazine,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    const newMagazines = [newMagazine, ...magazines];
    saveMagazines(newMagazines);
    return newMagazine;
  };

  const updateMagazine = (id, updates) => {
    const newMagazines = magazines.map(magazine => 
      magazine.id === id 
        ? { ...magazine, ...updates }
        : magazine
    );
    saveMagazines(newMagazines);
  };

  const deleteMagazine = (id) => {
    const newMagazines = magazines.filter(magazine => magazine.id !== id);
    saveMagazines(newMagazines);
  };

  return (
    <DataContext.Provider value={{
      articles,
      magazines,
      addArticle,
      updateArticle,
      deleteArticle,
      getArticleById,
      getPublishedArticles,
      addMagazine,
      updateMagazine,
      deleteMagazine
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;
