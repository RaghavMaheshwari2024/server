import mongoose from 'mongoose';

const evmClientIpSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true, // No machine can be reused or double-registered
        trim: true,
        lowercase: true
    },
    electionId: {
        type: String,
        required: true,
        unique: true, // One machine per election, and one election per machine
        trim: true
    },
    ipAddr: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function(v) {
                // Validates both IPv4 and IPv6
                return /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/i.test(v);
            },
            message: props => `${props.value} is not a valid IP address!`
        }
    },
    pubKey: {
        type: String,
        required: true,
        unique: true,
        select: false // Remains hidden from standard queries
    }
}, { 
    timestamps: true // Crucial for audit trails
});

export const EvmClientIp = mongoose.model('EvmClientIp', evmClientIpSchema);

