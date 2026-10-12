function calculateOrder() {
    const unitPrice = Number(document.getElementById("unitPrice").value);
    const quantity = Number(document.getElementById("quantity").value);
    const customerType = document.getElementById("customerType").value;
    const result = document.getElementById("result");

    if (!Number.isFinite(unitPrice) || unitPrice < 1) {
        result.textContent = "Please enter a price of at least ₹1.";
        document.getElementById("breakdown").textContent = "";
        return;
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
        result.textContent = "Please enter a whole-number quantity from 1 to 10.";
        document.getElementById("breakdown").textContent = "";
        return;
    }

    const subtotal = unitPrice * quantity;
    const rate = getRate(customerType);
    const discount = calculateDiscount(subtotal, rate);
    const serviceCharge = subtotal * 0.05;
    const payable = calculateTotal(subtotal, discount, serviceCharge);

    result.textContent =
        "Subtotal: ₹" + subtotal.toFixed(2) +
        " | Discount: ₹" + discount.toFixed(2) +
        " | Service: ₹" + serviceCharge.toFixed(2) +
        " | Payable: ₹" + payable.toFixed(2);

    document.getElementById("breakdown").textContent = buildBreakdown(unitPrice, quantity);
}

function calculateDiscount(amount, percentage) {
    return amount * percentage / 100;
}

function getRate(type) {
    if (type === "Student") {
        return 10;
    } else if (type === "Staff") {
        return 5;
    } else {
        return 0;
    }
}

function calculateTotal(subtotal, discount, serviceCharge) {
    return subtotal - discount + serviceCharge;
}

function buildBreakdown(unitPrice, quantity) {
    let summary = "";
    for (let item = 1; item <= quantity; item++) {
        const runningCost = unitPrice * item;
        summary += "After item " + item + ": ₹" + runningCost.toFixed(2) + "\n";
    }
    return summary.trim();
}
