
function desencriptarmensaje(mensaje){
    let key = "7jHuxxFW66rpq1KSYMtpHm1zIQRjbRxGu0FakFUK9Ww="
    importKeyFromString(key).then(function(keyP){
        decryptAES(mensaje,keyP).then(function(texto){
            const codigo = texto.substring(texto.length - 3, texto.length)
            texto= texto.substring(0, texto.length - 3)
            const Prkey = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDB8HMFAAQT83cgBlgYegUTARzCVgJxvvGAgYiie5KL9F1c/iuelVCYKU7RBvKEpu/ODYTOfJSf/YdwHXu7Ns07ReVSuk8Lo0QbFC+dEofkAxsp0dnrSaE5M7eOyKkfgF1YcK4qFCbZakCNfiGnfl3InLJTVsKuCrOUPSd/sXLEAUr35gn3EstQ5zCzBtWFEjrO2BJXPpfeHtdEdaqaNxFHXOMN+L2NdugSzOWroCPrqn0Aj1FJ4vmdpZUqUEvdwgLzowgMZN/YWM/k4nqW1oSTrq03T4PciF3WLJNeqTJ+XxKxCBcHWbJGYCUgy0+zW/Gjxv/r6Ub8/gV299AjETj1AgMBAAECggEADRUQCod4lEielwmb2gl/xnXolOViDyk0YkOao2yW3fD9y/RAngHFfit/K74pEDCwns4uUL16Sxvk4yJiAnwiYPwIiZ7pY8gUzod7OhW8wUaXslJRExGURLxhMUpbj4qZrAnB0zMpIbkMogl0R2JQp46GavUVzHwKpsEZ+n+jqxFVoMqZizClJpRhDP+5C0iwGEtfnQjE/hrFEXzcdr1GB6GE8UkI0jhHTnuVBwwmPLYQnHGZ+H4CMpp4W+2UI7edvjZ39XkZtd42zQ+VhHcS+3Y2klwqlxmziWzPJV5g/Osk5BmZQ1bFja8da2iHZPOeJVILDYcLzjB3TLOh2B1j8QKBgQD8hE3KfGc4rMKHBsv8OhTHDz9TsmnsGScnJv3X3pwA9YOUYPTlTNdnyTerN4qqRnhwSaVExBGq0w2dkIzkiVEpv6QyW/UoT2rZL7n3fZhDldB1o+sRCPm8SW+OgDv8fuuznRhty3VYq9EI6ofvNYuJuscTxn1zw+JudzpWsYywuQKBgQDEnUtYtcro+mUYxo/fv84mDAvU8ZMlnUalB7pSwErJxkJ5Fc9TdJvSjKV7ANjbvT+P5OPn8GDl546ZFPwU5obnZn956yusq1wpazeD6oaVY9UCAceM+b1xAZXob4DKwUd4GWFNls4SSwXVi0PSmX5Elw8hasd2xQGtQ7Bk7gjUHQKBgAHsM/dtuQ96aUTD7XuvKYdWe2H0ws+0ZVLr/hTNshxjwiu4DUVNr3ov0wevtZOUU8hvFx4N7CCD2N+xQRFgZkjOF772akhzSln6/gx/XVBubJbot5p6mgQv/vRzz4EdqkfE03HKkcsqC75oor5Uhwp2bJue8EeYXzn+GGiek3apAoGBAMEbfJV0eAa7Z/AdldG9IUxdKIHNgyi+gFQ2ctoz40CqaT9kHG1ramAxo5ZcDqJEDdnWhcGYZpNoCrZv1ebxRC6ijTHBuPOumqZTmAMIpYa0ttFxzfy4jUggtovEeEqr6vYad2ctZtiwtto2HjcKauoTM9kudxpABJWYlfeLk0BBAoGBAIWNhfz7+FPFY4NCUrLg2xQlPYNAS4FK8IG51i7QcddiOmntJhLxjPK4xRGodmYggApVA6nRfFF35EjDJXMrhvzeeBOig3eZvBcrwV++nS2Smv+m5ksDCdhAj6qUEUKSN46fmFdDfBVr8Sp1Qw2KKSCFP3MACpT+b4YAz3H/4zTl"
            importPrivateKey(Prkey,2048).then(function(llave){
                decryptDataWithPrivateKey(texto,llave).then(function(mensaje){
                    message = arrayBufferToString(mensaje)
                    return [mensaje, codigo]
                })
            })
        })
    })
}


function importKeyFromString(base64Key) {
    // Decodificar la clave Base64 a un ArrayBuffer
    const rawKey = Uint8Array.from(atob(base64Key), c => c.charCodeAt(0));
    // Importar la clave como una CryptoKey
    const cryptoKey = crypto.subtle.importKey(
        "raw",                
        rawKey.buffer,        
        { name: "AES-CTR" },  
        true,                 
        ["encrypt", "decrypt"] 
    );
    return cryptoKey;
}


function decryptAES(data,key) {
    num = stringToArrayBuffer("«÷Â��¤�ûtó��éjßê")
    return crypto.subtle.decrypt(
        {   name: "AES-CTR",
            counter: num,
            length: 64, // Longitud del contador en bits
        },
        key,
        data
    ).then(function(dato){
            let mensajeEnc = arrayBufferToString(dato)
            return mensajeEnc
        });
}

function importPrivateKey(pem,num) {
    
    const binaryDerString = window.atob(pem);
    const binaryDer = str2ab(binaryDerString);
    const pri =  crypto.subtle.importKey(
        "pkcs8",
        binaryDer,  
        {
        name: "RSA-OAEP",
        modulusLength: num,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: {name: "SHA-256"}
        },
        true,
        ["decrypt"]
    );    
    return pri;
}


function decryptDataWithPrivateKey(data, key) {
    const datos = stringToArrayBuffer(data);
    console.log(datos)
    return crypto.subtle.decrypt(
        {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: {name: "SHA-256"}},
        key,
        datos
    );
}
