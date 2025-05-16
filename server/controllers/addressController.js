import Address from "../models/Address.js"; // Assuming your model is here

export const addAddress = async (req, res) => {
    try {
        // Get userId from the authenticated user object set by authUser middleware
        // Corrected: req.user is set by authUser middleware as { id: tokenDecode.id }
        const userId = req.user.id;

        // Address details should be directly in req.body
        // Destructure all fields you expect from the client and intend to save
        const { firstName, lastName, email, phone, street, city, state, zipCode, country, addressType, isDefault } = req.body;

        // Basic validation for core required fields
        if (!street || !city || !state || !zipCode || !country) {
            return res.status(400).json({ success: false, message: "Missing required address fields (street, city, state, zipCode, country)." });
        }

        if (!userId) {
            // This case should ideally be handled by the authUser middleware,
            // but an extra check doesn't hurt.
            return res.status(401).json({ success: false, message: "User not authenticated or user ID missing." });
        }

        const newAddressData = {
            userId, // From authenticated user
            // Fields from req.body
            firstName,
            lastName,
            email,
            phone,
            street,
            city,
            state,
            zipCode,
            country,
            addressType, // Will be undefined if not sent, which is fine for optional fields in model
            // isDefault will also be undefined if not sent
        };

        // Explicitly set isDefault only if it's a boolean in the request
        // This prevents 'undefined' from being passed if the client doesn't send it,
        // allowing Mongoose model defaults to apply if any.
        if (typeof req.body.isDefault === 'boolean') {
            newAddressData.isDefault = req.body.isDefault;
        }
        
        // Clean up undefined optional fields that were not explicitly set (like addressType or isDefault if not boolean)
        // This helps if your model doesn't like 'undefined' for non-required fields without defaults.
        Object.keys(newAddressData).forEach(key => {
            if (newAddressData[key] === undefined) {
                // If it's 'isDefault' and wasn't a boolean, let it be removed so model default can apply
                // For other optional fields like 'addressType', if undefined, remove it.
                if (key !== 'isDefault' || typeof req.body.isDefault !== 'boolean') {
                    delete newAddressData[key];
                }
            }
        });


        const createdAddress = await Address.create(newAddressData);

        res.status(201).json({ success: true, message: "Address added successfully", address: createdAddress });

    } catch (error) {
        console.error("Detailed Error in addAddress:", error); // Log the full error object
        // Send back more detailed error information if available (e.g., Mongoose validation errors)
        res.status(500).json({
            success: false,
            message: error.message || "Server error while adding address.",
            details: error.errors || (error.name === "ValidationError" ? error : "No further details")
        });
    }
}


//get address : /api/address/get
export const getAddress = async (req, res) => {
    try {
        // Get userId from the authenticated user object set by authUser middleware
        // Corrected: req.user is set by authUser middleware as { id: tokenDecode.id }
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ success: false, message: "User not authenticated or user ID missing." });
        }

        // Find addresses associated with the userId, sort by newest first
        const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, addresses });

    } catch (error) {
        console.error("Error in getAddress:", error.message);
        res.status(500).json({
            success: false,
            message: error.message || "Server error while fetching addresses.",
            details: error.errors || (error.name === "ValidationError" ? error : "No further details")
        });
    }
};
