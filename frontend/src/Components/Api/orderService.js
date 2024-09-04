// orderService.js
const API_BASE_URL = 'http://localhost:5243/api';

export async function postAddress(addressData)
{
    const response = await fetch('http://localhost:5243/api/Addresses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData), // Ensure this matches the backend model
    });

    if (!response.ok)
    {
        const errorDetails = await response.json();
        throw new Error(`Failed to post address: ${JSON.stringify(errorDetails)}`);
    }

    return await response.json();
}

export async function postOrder(orderData)
{
    const response = await fetch(`${API_BASE_URL}/Orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
    });

    if (!response.ok)
    {
        throw new Error('Failed to post order');
    }

    return response.json();
}

export async function postOrderItem(orderItemData)
{
    const response = await fetch(`${API_BASE_URL}/OrderItems`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderItemData),
    });

    if (!response.ok)
    {
        throw new Error('Failed to post order item');
    }

    return response.json();
}
