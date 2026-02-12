class APIUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        let loginURL = "https://rahulshettyacademy.com/api/ecom/auth/login";
        const loginResponse = await this.apiContext.post(loginURL, { data: this.loginPayload });
        console.log(loginResponse);
        const loginResponse_json = await loginResponse.json();
        const token = loginResponse_json.token;
        return token;
    }

    async createOrder(orderPayload) {
        let response = {};
        response.token = await this.getToken();
        const createOrderUrl = "https://rahulshettyacademy.com/api/ecom/order/create-order";
        const createOrderResponse = await this.apiContext.post(createOrderUrl,
            {
                data: orderPayload,
                headers: {
                    "Authorization": response.token,
                    "Content-Type": "application/json"
                },
            });
        const createOrderResponse_json = await createOrderResponse.json();
        const orderId = createOrderResponse_json.orders[0];
        response.orderId = orderId;
        return response;
    }
}
module.exports = {APIUtils};