import request from 'request';

export const getAccessToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
            const auth = Buffer.from(`${process.env.SAFARICOM_CONSUMER_KEY}:${process.env.SAFARICOM_CONSUMER_SECRET}`).toString('base64');

            request(
                {
                    url: url,
                    headers: {
                        "Authorization": "Basic " + auth
                    }
                },
                (error: any, response: any, body: string) => {
                    if (error) {
                        console.error("Error fetching access token:", error);
                        reject(new Error('Failed to fetch access token'));
                    } else {
                        const accessToken = JSON.parse(body).access_token;
                        resolve(accessToken);
                    }
                }
            );
        } catch (error) {
            console.error("Access token error:", error);
            reject(new Error('Access token generation failed'));
        }
    });
};