/**
 * TradeSync Pro Payment Page - API Client
 */

const API_BASE_URL = 'https://tradesync-license-server-production.up.railway.app';

const PaymentAPI = {
    /**
     * Get payment info (wallet addresses, plans, etc.)
     */
    async getPaymentInfo() {
        const response = await fetch(`${API_BASE_URL}/api/payment/info`);
        if (!response.ok) {
            throw new Error('Failed to fetch payment info');
        }
        return response.json();
    },

    /**
     * Create a new payment order
     */
    async createOrder(orderData) {
        const response = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to create order');
        }

        return data;
    },

    /**
     * Check order status
     */
    async checkOrder(orderId) {
        const response = await fetch(`${API_BASE_URL}/api/payment/check/${orderId}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                return { found: false, message: 'Order not found' };
            }
            throw new Error('Failed to check order status');
        }

        return response.json();
    }
};

// Utility functions
const Utils = {
    /**
     * Format date to local string
     */
    formatDate(dateString) {
        return new Date(dateString).toLocaleString();
    },

    /**
     * Copy text to clipboard
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    },

    /**
     * Show toast notification
     */
    showToast(message, duration = 2000) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), duration);
    }
};

// Export for use in pages
window.PaymentAPI = PaymentAPI;
window.Utils = Utils;