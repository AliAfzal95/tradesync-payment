/**
 * TradeSync Pro Payment Page - API Client
 */


// API Configuration
const API_BASE_URL = 'https://tradesync-license-server-production.up.railway.app';

// Payment API
const PaymentAPI = {
    async getPaymentInfo() {
        const response = await fetch(`${API_BASE_URL}/api/payment/info`);
        if (!response.ok) throw new Error('Failed to get payment info');
        return response.json();
    },

    async createOrder(data) {
        const response = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    async checkOrder(orderId) {
        const response = await fetch(`${API_BASE_URL}/api/payment/check/${orderId}`);
        return response.json();
    }
};

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleString();
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}
