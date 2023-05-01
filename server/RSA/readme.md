# RSA
___

## Instruction
Les lignes de commande devront être réalisé à partir de la racine du dossier RSA

### Create private key RSA
    ssh-keygen -t rsa -b 4096 -m PEM -f key

### Create public key RSA
    ssh-keygen -e -m PEM -f key > key.pub