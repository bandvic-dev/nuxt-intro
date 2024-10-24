import axios from 'axios';
import * as cheerio from 'cheerio';

let title = null;
let bankName = null;
let bankBuyUSD = null;
let bankSellUSD = null;

async function scrapeData(url) {
  try {
    // Загружаем страницу
    const { data } = await axios.get(url);
    
    // Инициализируем Cheerio и загружаем HTML-код страницы
    const $ = cheerio.load(data);

    title = $('h1').text().trim();
    bankName = $('#tabelBankValute .fincombank a').text().trim();
    bankBuyUSD = $('#tabelBankValute .fincombank .column-USD').eq(0).text().trim();
    bankSellUSD = $('#tabelBankValute .fincombank .column-USD').eq(1).text().trim();
  } catch (error) {
    console.error('Ошибка при парсинге:', error);
  }
}

// Пример использования
const url = 'https://www.curs.md/ru/curs_valutar_banci';
scrapeData(url);


export default defineEventHandler((event) => {
    return {
        title,
        bankName,
        bankBuyUSD,
        bankSellUSD,
    };
});
