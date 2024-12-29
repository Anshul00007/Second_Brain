import crypto from 'crypto';

export default function random(len) {
    
    return crypto.randomBytes(len).toString('hex').slice(0, len);
}
