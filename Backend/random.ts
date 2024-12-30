import crypto from 'crypto';


export default function random(len:any) {
    
    return crypto.randomBytes(len).toString('hex').slice(0, len);
}
