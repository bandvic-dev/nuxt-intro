import axios from 'axios';
import * as cheerio from 'cheerio';

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
let cache = {
    data: null,
    timestamp: 0,
};

async function scrapeData(url) {
    if (cache.data && (Date.now() - cache.timestamp < CACHE_DURATION)) {
        return cache.data;
    }

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const title = $('h1').text().trim() || null;
        const bankName = $('#tabelBankValute .fincombank a').text().trim() || null;
        const bankBuyUSD = $('#tabelBankValute .fincombank .column-USD').eq(0).text().trim() || null;
        const bankSellUSD = $('#tabelBankValute .fincombank .column-USD').eq(1).text().trim() || null;

        if (!title || !bankName || !bankBuyUSD || !bankSellUSD) {
            throw new Error('Some elements not found on the page');
        }

        const scrapedData = {
            title,
            bankName,
            bankBuyUSD,
            bankSellUSD,
        };

        cache = {
            data: scrapedData,
            timestamp: Date.now(),
        };

        return scrapedData;
    } catch (error) {
        console.error({ message: 'Parsing error:', error: error.message });
        return null;
    }
}

export default defineEventHandler(async (event) => {
    const url = 'https://www.curs.md/ru/curs_valutar_banci';
    const data = await scrapeData(url);

    if (!data) {
        throw createError({ statusCode: 500, message: 'Error retrieving data from external source' });
    }
    
    return data;
});