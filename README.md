# Projeto NASA APOD

Um projeto consumindo a API da NASA (Astronomy Picture of the Day), separado em uma arquitetura completa com **Backend** (API Flask) independente do **Frontend** (HTML/CSS/JS estático).

## Estrutura de Pastas

```text
nasa-apod/
│
├── Backend/
│   ├── app.py              # API Flask (Servidor e consumo da API NASA)
│   └── requirements.txt    # Dependências do Python (Flask, Flask-CORS, Requests)
│
├── Frontend/
│   ├── index.html          # Página principal
│   ├── css/
│   │   └── style.css       # Estilos (Tema especial responsivo)
│   └── js/
│       └── script.js       # Lógica do Frontend (Faz fetch na API local do Backend)
│
└── README.md               # Instruções de execução
```

## Como rodar o projeto localmente

Como o projeto está separado, você precisa rodar o servidor backend para fornecer os dados e depois abrir o frontend.

### 1. Rodar o Backend (API)
1. Abra um terminal e navegue até a pasta `Backend`:
   ```bash
   cd Backend
   ```
2. Instale as dependências. Note que agora precisamos do `flask-cors` para o frontend conseguir acessar a API localmente:
   ```bash
   pip install -r requirements.txt
   ```
3. Inicie o servidor:
   ```bash
   python app.py
   ```
O backend ficará rodando em `http://127.0.0.1:5000`. Não feche este terminal.

### 2. Rodar o Frontend
- Como o Frontend está totalmente desacoplado, você pode simplesmente dar um **duplo clique** no arquivo `Frontend/index.html` e ele abrirá diretamente no navegador.
- *Opcional:* Se estiver usando VS Code, pode utilizar a extensão **Live Server** (Botão direito em `index.html` > Open with Live Server).

> **Atenção:** O site funcionará e renderizará o layout sem o backend, mas precisará que o terminal do backend (passo 1) esteja rodando em segundo plano para conseguir puxar e exibir as informações e as imagens da NASA com sucesso.
