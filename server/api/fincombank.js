import axios from 'axios';
import * as cheerio from 'cheerio';

async function scrapeData(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        return {
            title: $('h1').text().trim(),
            bankName: $('#tabelBankValute .fincombank a').text().trim(),
            bankBuyUSD: $('#tabelBankValute .fincombank .column-USD').eq(0).text().trim(),
            bankSellUSD: $('#tabelBankValute .fincombank .column-USD').eq(1).text().trim(),
        }
    } catch (error) {
        console.error({ message: 'Ошибка при парсинге:' + error });
    }
}

export default defineEventHandler(async (event) => {
    const url = 'https://www.curs.md/ru/curs_valutar_banci'; 
    const data = await scrapeData(url);
    
    return data;
});
