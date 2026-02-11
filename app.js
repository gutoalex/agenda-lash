const { useState, useEffect, useRef } = React;

// =================================================================================
// ÁREA DE CONFIGURAÇÃO & API GEMINI
// =================================================================================

const apiKey = "AIzaSyCcEiCG4mJYUP2stxgKszk2KQ6RaYmhhQo"; 

var CONFIG = {
    nomeProfissional: "Le",
    telefoneProfissional: "5511989224362", 
    emailProfissional: "lscilios.contato@gmail.com", 
    senhaAdmin: "1234",
    scriptGoogleUrl: "https://script.google.com/macros/s/AKfycbx8Ss4ozl8-XVVtGSZGM96drbv7Z8v1citsXO3gQZ9pleth7qMutJcyVwgjsBcqCb5JmA/exec", 
    icalUrlPrivate: "https://calendar.google.com/calendar/ical/lscilios.contato%40gmail.com/private-994f64be13e6b1d832cf279c97c36175/basic.ics",
    icalUrlPublic: "https://calendar.google.com/calendar/ical/lscilios.contato%40gmail.com/public/basic.ics",
    linkAgendaPublicaGoogle: "https://calendar.google.com/calendar/embed?src=lscilios.contato%40gmail.com&ctz=America%2FSao_Paulo", 
    
    depoimentos: [
        { nome: "Cliente", texto: "Amo sua flexibilidade, paciência e atendimento. Você me dá a liberdade de escolher o estilo e a durabilidade é ótima!" },
        { nome: "Cliente", texto: "Seu trabalho é ótimo! O espaço aconchegante. Higiene impecável e cuidado para não arder os olhos." },
        { nome: "Cliente", texto: "Seu trabalho é sinceramente o melhor que já fiz e vejo. Não fico mais sem cílios e sem você!" },
        { nome: "Cliente", texto: "Me sinto acolhida com seu atendimento. Facilita muito minha vida com duas crianças." }
    ],

    servicos: [
        { 
            id: 1, 
            nome: "Volume Pamela", 
            desc: "Fio a Fio Black. Ponta dupla, oco e leve. Efeito Rímel.",
            fullDesc: "No Volume Pamela, mais conhecido como Fio a Fio Black, é aplicado um fio do black em cada fio natural. O nosso fio black, apesar de ser mais grosso que o clássico, é oco por dentro e tem a pontinha dupla, o que o torna mais leve e com aspecto de mais volume com efeito rímel.",
            imagem: "img/pamela.jpg",
            precos: { aplicacao: 115, manutencao: 95, remocao: 30 }
        },
        { 
            id: 2, 
            nome: "Volume Paty", 
            desc: "Brasileiro. Fios em Y, efeito entrelaçado com volume.",
            fullDesc: "O Volume Paty, mais conhecido como Volume Brasileiro, utiliza fios em formato de Y. Proporciona um volume de acordo com a quantidade dos seus cílios naturais e dá um efeito de cílios entrelaçados. A técnica é a mesma do fio a fio, porém com mais volume.",
            imagem: "img/paty.jpg",
            precos: { aplicacao: 135, manutencao: 100, remocao: 30 }
        },
        { 
            id: 3, 
            nome: "Volume Jaque", 
            desc: "Fox Eyes. Olhos de raposa, sensual e marcante.",
            fullDesc: "O Volume Jaque, mais conhecido como Fox Eyes (Olhos de Raposa), é uma técnica que consegue deixar os olhos com um formato mais alongado, proporcionando um olhar mais sensual e marcante.",
            imagem: "img/jaque.jpg",
            precos: { aplicacao: 135, manutencao: 100, remocao: 30 }
        },
        { 
            id: 4, 
            nome: "Volume Emily", 
            desc: "Efeito Delineado. Curvatura M, efeito lifting sofisticado.",
            fullDesc: "O Volume Emily oferece um efeito delineado sutil, ideal para quem deseja um olhar mais alongado. Usando a curvatura M, ele proporciona um efeito lifting semelhante ao 'Fox Eyes'. Os fios têm excelente aderência, pois possuem uma base reta que só começa a curvar na metade, criando um acabamento natural e sofisticado.",
            imagem: "img/emily.jpg",
            precos: { aplicacao: 140, manutencao: 105, remocao: 30 }
        },
        { 
            id: 5, 
            nome: "Volume Duda", 
            desc: "Volume 3D. Fios ultrafinos com destaque central.",
            fullDesc: "O Volume Duda é o famoso cílios Volume 3D. É uma técnica que utiliza fios sintéticos ultra finos tendo um fio mais marcante no meio. O fio é leve para criar um efeito marcante e dramático nos cílios naturais. Nessa técnica, é aplicado um fio 3D em cada cílio natural.",
            imagem: "img/duda.jpg",
            precos: { aplicacao: 140, manutencao: 105, remocao: 30 }
        },
        { 
            id: 6, 
            nome: "Volume Carol", 
            desc: "Inglês 5D. Leque com até 5 fios. Volumoso e dramático.",
            fullDesc: "O Volume Carol é o famoso cílios Volume Inglês 5D. É uma técnica que utiliza fios sintéticos ultrafinos e leves para criar um efeito volumoso e dramático. Nessa técnica, é aplicado um 'leque' com até 5 fios artificiais em cada cílio natural.",
            imagem: "img/carol.jpg",
            precos: { aplicacao: 155, manutencao: 105, remocao: 30 }
        },
        { 
            id: 7, 
            nome: "Volume Nath", 
            desc: "Efeito Molhado. Sensação de fios úmidos e naturais.",
            fullDesc: "Uma técnica que traz naturalidade e sofisticação! O efeito molhado cria a sensação de fios levemente úmidos, devido à densidade dos fios aplicados. São agrupamentos delicados de mais de dois fios no fio natural, resultando em um olhar marcante, elegante e ao mesmo tempo super natural.",
            imagem: "img/nath.jpg",
            precos: { aplicacao: 130, manutencao: 100, remocao: 30 }
        },
        { 
            id: 8, 
            nome: "Volume Grazi", 
            desc: "Naturalmente marcante. Discreto, leve e equilibrado.",
            fullDesc: "Técnica naturalmente marcante, perfeita para quem ama um olhar discreto e delicado. O efeito é semelhante ao fio a fio, mas com um toque a mais de volume, deixando o olhar leve, natural e ao mesmo tempo marcante. Ideal pra quem busca um resultado suave, elegante e equilibrado.",
            imagem: "img/grazi.jpg",
            precos: { aplicacao: 135, manutencao: 105, remocao: 30 }
        },
        { 
            id: 9, 
            nome: "Volume Bia", 
            desc: "Volume Sirena. Aplicado do meio ao final. Puxadinho.",
            fullDesc: "No Volume Sirena é aplicado do meio ao final dos olhos, garantindo leveza sem perder preenchimento. Feito com fios 5D em curvatura M, que alongam e dão efeito delineado, sem incomodar no canto interno. Perfeito para quem quer um olhar natural, puxadinho e elegante.",
            imagem: "img/bia.jpg",
            precos: { aplicacao: 130, manutencao: 100, remocao: 30 }
        },
        { 
            id: 10, 
            nome: "Volume Fernanda", 
            desc: "Delicado e elegante. Fios mais fechadinhos (3 fios).",
            fullDesc: "Volume delicado, natural e elegante. Um pouco mais cheio que o volume Grazi, ele é feito com fios mais fechadinhos, utilizando 3 fios, o que garante um olhar marcante sem perder a leveza. Trabalhado na curvatura C, entrega um efeito ainda mais natural.",
            imagem: "img/fernanda.jpg",
            precos: { aplicacao: 135, manutencao: 105, remocao: 30 }
        }
    ],
    horarios: [
        "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", 
        "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
    ]
};

const Icons = {
    Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
    Whatsapp: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>,
    Lock: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
    LogOut: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
    Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
    Eye: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8-11-8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
    Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
    Cake: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"></path><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"></path><path d="M2 21h20"></path><path d="M7 8v2"></path><path d="M12 8v2"></path><path d="M17 8v2"></path><path d="M7 4h.01"></path><path d="M12 4h.01"></path><path d="M17 4h.01"></path></svg>,
    Alert: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
    Home: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
    MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
    Briefcase: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>,
    Refresh: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>,
    Info: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
    Clock: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
    EyeOff: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>,
    CreditCard: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>,
    Smartphone: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>,
    Dollar: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
    Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
    Gemini: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path></svg>,
    Share: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>,
    Star: () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
    User: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
    CloudDownload: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
    Ghost: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z"></path><path d="M9 9h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6"></path><path d="M9 9a3 3 0 0 0-6 0"></path><path d="M9 6a6 6 0 0 1 12 0v3"></path></svg>,
    Camera: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>,
    Copy: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>,
    Sparkles: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>,
    Analysis: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h5"></path><path d="M17 12h5"></path><path d="M12 2v5"></path><path d="M12 17v5"></path><circle cx="12" cy="12" r="4"></circle><path d="M10 2 2.5 9.5"></path><path d="M14 2l7.5 7.5"></path><path d="M10 22l-7.5-7.5"></path><path d="M14 22l7.5-7.5"></path></svg>
};

async function chamarGemini(prompt, systemInstruction = "") {
    if (!apiKey) {
        console.error("API Key do Gemini não configurada!");
        return null;
    }
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemInstruction }] }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
        console.error("Erro ao chamar Gemini:", error);
        return null;
    }
}

function ChatbotIA() {
    const [aberto, setAberto] = useState(false);
    const [msg, setMsg] = useState('');
    const [historico, setHistorico] = useState([
        { role: 'bot', text: 'Olá! Sou a assistente virtual da Le. Tem alguma dúvida sobre os cílios ou valores? 💖' }
    ]);
    const [loading, setLoading] = useState(false);
    const msgEndRef = useRef(null);

    useEffect(() => {
        msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [historico]);

    const enviarMsg = async () => {
        if (!msg.trim()) return;
        
        const novaMsg = { role: 'user', text: msg };
        setHistorico(prev => [...prev, novaMsg]);
        setMsg('');
        setLoading(true);

        const servicosTexto = CONFIG.servicos.map(s => 
            `- ${s.nome}: Aplicação R$${s.precos.aplicacao}, Manutenção R$${s.precos.manutencao}`
        ).join('\n');

        const prompt = `Você é a assistente virtual da Ls Cílios, atendendo clientes da Le.
        
        Contexto dos Serviços:
        ${servicosTexto}
        
        Informações Importantes:
        - Manutenção sugerida a cada 15-20 dias.
        - Cuidados: Não molhar nas primeiras 24h, não usar rímel, lavar com shampoo neutro.
        - Local: Atendemos no Studio ou a Domicílio (com taxa Uber).
        
        Pergunta da cliente: "${novaMsg.text}"
        
        Responda de forma curta, simpática e use emojis. Se for algo muito específico que não sabe, peça para chamar a Le no WhatsApp.`;

        const respostaTexto = await chamarGemini(prompt, "Você é uma assistente virtual de beleza útil e amigável.");
        
        setHistorico(prev => [...prev, { role: 'bot', text: respostaTexto || "Desculpe, minha conexão falhou. Pode me perguntar de novo? 🥺" }]);
        setLoading(false);
    };

    return (
        <>
            <button 
                onClick={() => setAberto(!aberto)}
                className="fixed bottom-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg z-50 hover:scale-105 transition-transform flex items-center gap-2 font-bold text-xs"
            >
                {aberto ? <Icons.Close /> : <span className="text-xl">🤖</span>}
                {!aberto && "Dúvidas?"}
            </button>

            {aberto && (
                <div className="fixed bottom-20 left-4 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4" style={{maxHeight: '60vh'}}>
                    <div className="bg-purple-600 p-3 text-white flex justify-between items-center">
                        <span className="font-bold text-sm flex items-center gap-2">🤖 Assistente Ls Cílios</span>
                        <button onClick={() => setAberto(false)}><Icons.Close /></button>
                    </div>
                    
                    <div className="flex-1 p-3 overflow-y-auto bg-gray-50 space-y-3 text-xs">
                        {historico.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-2 rounded-xl ${m.role === 'user' ? 'bg-purple-100 text-purple-800 rounded-tr-none' : 'bg-white border border-gray-200 text-gray-600 rounded-tl-none'}`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 p-2 rounded-xl rounded-tl-none">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={msgEndRef} />
                    </div>

                    <div className="p-2 bg-white border-t border-gray-100 flex gap-2">
                        <input 
                            type="text" 
                            className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-purple-500"
                            placeholder="Digite sua dúvida..."
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && enviarMsg()}
                        />
                        <button 
                            onClick={enviarMsg}
                            disabled={loading || !msg.trim()}
                            className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

function App() {
    const [modo, setModo] = useState('cliente');
    const [showLogin, setShowLogin] = useState(false);
    const [senhaInput, setSenhaInput] = useState('');
    const [erroSenha, setErroSenha] = useState(false);

    const tentarLogin = () => {
        if (senhaInput === CONFIG.senhaAdmin) {
            setModo('profissional');
            setShowLogin(false);
            setSenhaInput('');
            setErroSenha(false);
        } else {
            setErroSenha(true);
        }
    };

    return (
        <div className="min-h-screen pb-20 flex flex-col items-center justify-start pt-10 px-4">
            
            <div className="text-center mb-8 fade-in relative w-full max-w-md">
                
                {/* Botão Sobre (Esquerda) */}
                {modo === 'cliente' && (
                    <button 
                        onClick={() => document.getElementById('modal-sobre').showModal()}
                        className="absolute left-0 top-0 p-2 text-pink-400 hover:text-pink-600 transition-colors"
                        title="Quem é a Le?"
                    >
                        <Icons.User />
                    </button>
                )}

                 {/* Botão Compartilhar (Direita) */}
                {modo === 'cliente' && (
                    <button 
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: 'Agenda da Le - Ls Cílios',
                                    text: 'Agende seu horário com a melhor Lash Designer!',
                                    url: window.location.href,
                                });
                            } else {
                                alert("Link copiado para a área de transferência!");
                                navigator.clipboard.writeText(window.location.href);
                            }
                        }}
                        className="absolute right-0 top-0 p-2 text-pink-400 hover:text-pink-600 transition-colors"
                        title="Indicar para amiga"
                    >
                        <Icons.Share />
                    </button>
                )}
                
                {/* ÁREA DA LOGO */}
                <div className="flex justify-center mb-4 h-32">
                    <img 
                        src="img/logo.png" 
                        alt="Logo Ls Cílios" 
                        className="h-full w-auto object-contain drop-shadow-md"
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = "https://placehold.co/150x150/ec4899/FFFFFF?text=Sua+Logo"; 
                        }}
                    />
                </div>

                <h1 className="text-3xl font-bold text-pink-600">Agenda da Le</h1>
                <p className="text-gray-500 text-sm mt-1">Ls Cílios</p>
            </div>

            <div className="w-full max-w-md">
                {modo === 'cliente' ? <TelaCliente /> : <TelaProfissional onSair={() => setModo('cliente')} />}
            </div>

            <footer className="mt-16 text-center text-xs text-gray-400 flex flex-col items-center gap-2">
                <p>Feito para Lash Designers ✨</p>
                <p className="text-[10px] text-gray-300">Powered by Google Gemini 🤖</p>
                {modo === 'cliente' && (
                    <button onClick={() => setShowLogin(true)} className="text-pink-300 opacity-60 hover:opacity-100 transition-all p-3" title="Área da Profissional">
                        <Icons.Lock />
                    </button>
                )}
            </footer>

            {/* MODAL SOBRE A LE */}
            <dialog id="modal-sobre" className="modal rounded-2xl p-0 w-full max-w-sm shadow-2xl backdrop:bg-black/60">
                <div className="bg-white p-0 relative">
                    <button onClick={() => document.getElementById('modal-sobre').close()} className="absolute top-3 right-3 bg-black/10 hover:bg-black/20 rounded-full p-1 z-10"><Icons.Close /></button>
                    
                    <div className="h-40 bg-gradient-to-b from-pink-100 to-white flex items-end justify-center pb-4">
                         <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                            <img 
                                src="img/logo.png" 
                                className="w-full h-full rounded-full object-cover"
                                onError={(e) => e.target.src = 'https://placehold.co/100x100/ec4899/FFFFFF?text=Le'}
                            />
                         </div>
                    </div>

                    <div className="p-6 text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">Letícia Souza</h3>
                        <p className="text-purple-500 text-xs font-bold mb-4">Lash Designer há 4 anos</p>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 text-justify">
                            "Meu nome é Letícia Souza e atuo como Designer de Cílios há quase 4 anos. Possuo experiência em mais de 5 técnicas de extensão de cílios. Minha abordagem prioriza o cliente, valorizando o relacionamento estabelecido com cada indivíduo atendido."
                        </p>
                         <p className="text-gray-600 text-sm leading-relaxed mb-6 text-justify">
                            "Compreender suas necessidades e preferências é essencial para garantir uma experiência personalizada e satisfatória. <strong>Minha missão consiste em realçar a beleza do seu olhar.</strong>"
                        </p>

                        <button onClick={() => document.getElementById('modal-sobre').close()} className="w-full bg-pink-500 text-white font-bold py-2 rounded-xl hover:bg-pink-600">Fechar</button>
                    </div>
                </div>
            </dialog>

            {showLogin && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 fade-in">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-xs scale-in">
                        <h3 className="font-bold text-gray-800 mb-4 text-center">Acesso Restrito 🔒</h3>
                        <input type="password" className={`w-full p-3 bg-gray-50 rounded-xl border ${erroSenha ? 'border-red-500' : 'border-gray-200'} focus:outline-none mb-4 text-center text-lg`} placeholder="Senha" value={senhaInput} onChange={(e) => {setSenhaInput(e.target.value); setErroSenha(false);}} />
                        <div className="flex gap-2">
                            <button onClick={() => {setShowLogin(false); setErroSenha(false); setSenhaInput('');}} className="flex-1 py-2 text-gray-500 font-medium rounded-lg hover:bg-gray-100">Cancelar</button>
                            <button onClick={tentarLogin} className="flex-1 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600">Entrar</button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Chatbot Integrado */}
            {modo === 'cliente' && <ChatbotIA />}
        </div>
    );
}

const fetchICSAndParse = async (url, dateStr) => {
    try {
        const targetWithCache = url + (url.includes('?') ? '&' : '?') + 't=' + new Date().getTime();
        const proxyUrl = 'https://corsproxy.io/?';
        const response = await fetch(proxyUrl + encodeURIComponent(targetWithCache));
        if (!response.ok) return [];
        const icsText = await response.text();
        const events = [];
        const lines = icsText.split(/\r\n|\n|\r/);
        let currentEvent = null;
        lines.forEach(line => {
            if (line.startsWith('BEGIN:VEVENT')) { currentEvent = {}; } 
            else if (line.startsWith('END:VEVENT')) { if (currentEvent && currentEvent.dtstart) events.push(currentEvent); currentEvent = null; } 
            else if (currentEvent) {
                const colonIndex = line.indexOf(':');
                if (colonIndex > -1) {
                    const keyPart = line.substring(0, colonIndex);
                    const value = line.substring(colonIndex + 1);
                    if (keyPart === 'SUMMARY') currentEvent.summary = value;
                    if (keyPart === 'LOCATION') currentEvent.location = value;
                    if (keyPart.startsWith('DTSTART')) { if (keyPart.includes('VALUE=DATE')) { currentEvent.dtstart = value + "T000000"; } else { currentEvent.dtstart = value; } }
                    if (keyPart.startsWith('DTEND')) { if (keyPart.includes('VALUE=DATE')) { currentEvent.dtend = value + "T000000"; } else { currentEvent.dtend = value; } }
                }
            }
        });
        const targetYMD = dateStr.replace(/-/g, '');
        return events.filter(ev => {
            let startStr = ev.dtstart;
            if (startStr && startStr.includes('Z')) {
                const y = parseInt(startStr.substring(0, 4)); const m = parseInt(startStr.substring(4, 6)) - 1; const d = parseInt(startStr.substring(6, 8)); const h = parseInt(startStr.substring(9, 11)); const min = parseInt(startStr.substring(11, 13));
                const dateObj = new Date(Date.UTC(y, m, d, h, min));
                const localY = dateObj.getFullYear(); const localM = (dateObj.getMonth() + 1).toString().padStart(2, '0'); const localD = dateObj.getDate().toString().padStart(2, '0');
                const localDateStr = `${localY}${localM}${localD}`;
                ev.localHour = dateObj.getHours(); 
                return localDateStr === targetYMD;
            } else {
                const rawDate = startStr.split('T')[0];
                if (rawDate === targetYMD) {
                    if (startStr.includes('T')) { ev.localHour = parseInt(startStr.split('T')[1].substring(0,2)); } else { ev.localHour = -1; }
                    return true;
                }
                return false;
            }
        });
    } catch (e) { console.error("Erro ao ler agenda", e); return []; }
};

const salvarAgendamentoPlanilha = async (dadosCliente) => {
    if (!CONFIG.scriptGoogleUrl) return; 
    try {
        await fetch(CONFIG.scriptGoogleUrl, {
            method: 'POST',
            mode: 'no-cors', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosCliente)
        });
        console.log("Enviado para planilha!");
    } catch (e) {
        console.error("Erro ao salvar na planilha", e);
    }
};

function TelaCliente() {
    const [step, setStep] = useState(1);
    const [dados, setDados] = useState({ 
        nome: '', whatsapp: '', email: '', nascimento: '', 
        servicoObj: null, tipoServico: '', precoFinal: '',
        data: '', hora: '', 
        tipoAtendimento: 'studio', endereco: '', complemento: ''
    });
    
    const [carregandoHorarios, setCarregandoHorarios] = useState(false);
    const [horariosOcupados, setHorariosOcupados] = useState([]);
    const [vendoAgenda, setVendoAgenda] = useState(false); 
    const [modalConfirmacao, setModalConfirmacao] = useState(false); 
    const [horarioPendente, setHorarioPendente] = useState(''); 
    const [pedidoEnviado, setPedidoEnviado] = useState(false);
    const [servicoExpandido, setServicoExpandido] = useState(null);
    const [modalDetalhes, setModalDetalhes] = useState(null); 
    const [showModalIA, setShowModalIA] = useState(false);
    const [inputIA, setInputIA] = useState('');
    const [loadingIA, setLoadingIA] = useState(false);
    const [respostaIA, setRespostaIA] = useState(null);
    const [depoimentoIndex, setDepoimentoIndex] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setDepoimentoIndex((prev) => (prev + 1) % CONFIG.depoimentos.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const hoje = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (dados.data) {
            verificarDisponibilidade(dados.data);
        }
    }, [dados.data]);

    const verificarDisponibilidade = async (dataSelecionada) => {
        setCarregandoHorarios(true);
        setHorariosOcupados([]);
        const eventos = await fetchICSAndParse(CONFIG.icalUrlPrivate, dataSelecionada);
        const ocupados = [];
        eventos.forEach(ev => {
            if (ev.localHour !== undefined && ev.localHour !== -1) {
                const horaInicio = ev.localHour;
                const horaFormatada = (horaInicio < 10 ? '0'+horaInicio : horaInicio) + ":00";
                ocupados.push(horaFormatada);
            } 
        });
        setHorariosOcupados(ocupados);
        setCarregandoHorarios(false);
    };

    const selecionarServico = (servico, tipo) => {
        let preco = 0;
        if(tipo === 'aplicacao') preco = servico.precos.aplicacao;
        if(tipo === 'manutencao') preco = servico.precos.manutencao;
        if(tipo === 'remocao') preco = servico.precos.remocao;
        setDados({ ...dados, servicoObj: servico, tipoServico: tipo, precoFinal: preco });
        setModalDetalhes(null); 
        setStep(2);
    };
    
    const handleCliqueHorario = (hora) => { 
        if (horariosOcupados.includes(hora)) return;
        setHorarioPendente(hora);
        setModalConfirmacao(true);
    };

    const confirmarHorario = () => {
        setDados({ ...dados, hora: horarioPendente });
        setModalConfirmacao(false);
    }

    const salvarDadosLocal = () => {
        salvarAgendamentoPlanilha(dados);
    };

    const enviarWhatsapp = () => {
        if (!dados.nome || !dados.whatsapp || !dados.data || !dados.hora) { alert("Por favor, preencha todos os campos obrigatórios!"); return; }
        if(dados.tipoAtendimento === 'domicilio' && !dados.endereco) { alert("Preencha o endereço!"); return; }
        
        salvarDadosLocal();

        const dataFormatada = dados.data.split('-').reverse().slice(0, 2).join('/');
        
        let tipoTexto = "";
        if(dados.tipoServico === 'aplicacao') tipoTexto = "Aplicação ✨";
        if(dados.tipoServico === 'manutencao') tipoTexto = "Manutenção 🔧";
        if(dados.tipoServico === 'remocao') tipoTexto = "Remoção 🧼";

        let mensagem = `Oii ${CONFIG.nomeProfissional}! 💖\n\nMe chamo *${dados.nome}*.\nZap: ${dados.whatsapp}`;
        if(dados.email) mensagem += `\nEmail: ${dados.email}`;
        mensagem += `\n\nGostaria de agendar:\n*${dados.servicoObj.nome}*\nTipo: *${tipoTexto}* (R$ ${dados.precoFinal},00)\n\n🗓 Data: *${dataFormatada}*\n⏰ Horário: *${dados.hora}*`;
        
        if(dados.tipoAtendimento === 'domicilio') {
            mensagem += `\n\n📍 *A DOMICÍLIO*\nLocal: ${dados.endereco}\n⚠️ *Ciente da taxa de Uber.*`;
        } else {
            mensagem += `\n\n📍 No Studio`;
        }
        
        window.open(`https://wa.me/${CONFIG.telefoneProfissional}?text=${encodeURIComponent(mensagem)}`, '_blank');
        setPedidoEnviado(true);
    };

    const enviarInviteAgenda = () => {
            if (!dados.nome || !dados.data || !dados.hora) { alert("Preencha data e hora!"); return; }
            const dataLimpa = dados.data.replace(/-/g, '');
            const horaLimpa = dados.hora.replace(':', '') + '00';
            const inicio = `${dataLimpa}T${horaLimpa}`;
            let horaFimNum = parseInt(dados.hora.split(':')[0]) + 1;
            const fim = `${dataLimpa}T${horaFimNum < 10 ? '0'+horaFimNum : horaFimNum}0000`;
            const titulo = `Cílios: ${dados.nome}`;
            let detalhes = `Cliente: ${dados.nome}\nServiço: ${dados.servicoObj.nome} (${dados.tipoServico})\nZap: ${dados.whatsapp}`;
            if(dados.tipoAtendimento === 'domicilio') detalhes += `\nLocal: ${dados.endereco}`;
            const linkGoogle = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(titulo)}&dates=${inicio}/${fim}&details=${encodeURIComponent(detalhes)}&add=${CONFIG.emailProfissional}`;
            window.open(linkGoogle, '_blank');
    };

    const consultarEstiloIA = async () => {
        if (!inputIA.trim()) return;
        setLoadingIA(true);
        setRespostaIA(null);
        const catalogoTexto = CONFIG.servicos.map(s => `ID: ${s.id}, Nome: ${s.nome}, Descrição: ${s.fullDesc}`).join('\n');
        const prompt = `Você é uma especialista em cílios da 'Ls Cílios'. O catálogo é: \n${catalogoTexto}\n\nA cliente disse: "${inputIA}".\n\nRecomende 1 (um) serviço ideal. Responda APENAS um JSON válido neste formato: { "id": number, "motivo": "string curta explicando o porquê de forma amigável" }`;
        const resultado = await chamarGemini(prompt, "Você é um assistente de estilo útil.");
        if (resultado) {
            try {
                const cleanJson = resultado.replace(/```json|```/g, '').trim();
                const recomendacao = JSON.parse(cleanJson);
                setRespostaIA(recomendacao);
            } catch (e) {
                console.error("Erro ao parsear JSON IA", e);
                setRespostaIA({ motivo: "Desculpe, não consegui entender perfeitamente, mas sugiro dar uma olhada no Volume Brasileiro!" });
            }
        } else {
            setRespostaIA({ motivo: "Opa, minha inteligência está tirando um cochilo. Tente novamente!" });
        }
        setLoadingIA(false);
    };

    if (pedidoEnviado) {
        return (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden fade-in border border-pink-100 p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <div className="text-green-500 scale-150"><Icons.Check /></div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Oba, {dados.nome.split(' ')[0]}! 🎉</h2>
                <h3 className="text-xl font-semibold text-pink-600 mb-4">Pedido Enviado com Sucesso!</h3>
                
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    Recebi sua solicitação aqui. <br/>
                    Agora é só aguardar que logo logo eu te chamo no WhatsApp para confirmar tudo certinho! 💖
                </p>
                
                <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 mb-6 w-full">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Resumo:</p>
                    <p className="text-gray-700 font-medium">{dados.servicoObj?.nome}</p>
                    <p className="text-gray-600 text-sm">{dados.data.split('-').reverse().slice(0, 2).join('/')} às {dados.hora}</p>
                </div>

                <button onClick={() => { setPedidoEnviado(false); setStep(1); setDados({ ...dados, hora: '', data: '' }); }} className="text-purple-600 font-bold hover:text-purple-800 hover:underline transition-all">Fazer outro agendamento</button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden fade-in border border-pink-100 relative">
            <div className="bg-pink-50 h-2 w-full flex">
                <div className={`h-full bg-pink-500 transition-all duration-300 ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
            </div>

            <div className="p-6">
                {step === 1 && (
                    <div className="fade-in">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex justify-between items-center">
                            Escolha o Procedimento
                            <button 
                                onClick={() => setShowModalIA(true)}
                                className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-bold flex items-center gap-1 hover:bg-purple-200 transition-colors sparkle-icon"
                            >
                                <Icons.Gemini /> Me ajude a escolher
                            </button>
                        </h2>
                        <div className="space-y-4">
                            {CONFIG.servicos.map((s) => (
                                <div key={s.id} className="border border-pink-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all">
                                    <div 
                                        onClick={() => setServicoExpandido(servicoExpandido === s.id ? null : s.id)}
                                        className="w-full text-left p-4 flex gap-4 items-center bg-gray-50 hover:bg-pink-50 transition-colors relative cursor-pointer"
                                    >
                                        <div 
                                            className="w-16 h-16 shrink-0 bg-white rounded-lg border border-pink-100 overflow-hidden relative group"
                                            onClick={(e) => {
                                                e.stopPropagation(); 
                                                setModalDetalhes(s);
                                            }}
                                        >
                                            <img 
                                                src={s.imagem} 
                                                alt={s.nome} 
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.src = 'https://placehold.co/100x100/ec4899/FFFFFF?text=Foto'} 
                                            />
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-white text-xs font-bold">+Info</span>
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <span className="font-bold text-gray-700 block">{s.nome}</span>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation(); 
                                                        setModalDetalhes(s);
                                                    }}
                                                    className="text-pink-400 hover:text-pink-600 text-xs px-2 py-1 rounded bg-pink-50"
                                                >
                                                    <Icons.Info />
                                                </button>
                                            </div>
                                            <span className="text-[10px] text-gray-500 line-clamp-2 mt-1">{s.desc}</span>
                                        </div>
                                        <div className="text-pink-400 pl-2">
                                            {servicoExpandido === s.id ? '▼' : '▶'}
                                        </div>
                                    </div>
                                    
                                    {servicoExpandido === s.id && (
                                        <div className="p-3 bg-white grid gap-2 animate-in fade-in slide-in-from-top-2 border-t border-pink-50">
                                            <button onClick={() => selecionarServico(s, 'aplicacao')} className="w-full text-left p-3 rounded-lg border border-gray-100 hover:border-pink-300 hover:bg-pink-50 flex justify-between items-center group">
                                                <span className="text-sm font-medium text-gray-600 group-hover:text-pink-600">✨ Aplicação Nova</span>
                                                <span className="font-bold text-pink-500">R$ {s.precos.aplicacao}</span>
                                            </button>
                                            <button onClick={() => selecionarServico(s, 'manutencao')} className="w-full text-left p-3 rounded-lg border border-gray-100 hover:border-purple-300 hover:bg-purple-50 flex justify-between items-center group">
                                                <span className="text-sm font-medium text-gray-600 group-hover:text-purple-600">🔧 Manutenção</span>
                                                <span className="font-bold text-purple-500">R$ {s.precos.manutencao}</span>
                                            </button>
                                            <button onClick={() => selecionarServico(s, 'remocao')} className="w-full text-left p-3 rounded-lg border border-gray-100 hover:border-red-300 hover:bg-red-50 flex justify-between items-center group">
                                                <span className="text-sm font-medium text-gray-600 group-hover:text-red-600">🧼 Remoção</span>
                                                <span className="font-bold text-red-400">R$ {s.precos.remocao}</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 mb-4">
                            <h3 className="text-center font-bold text-gray-400 text-xs uppercase mb-4 tracking-widest">O que dizem sobre a Le</h3>
                            <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 relative">
                                <div className="absolute -top-3 left-4 bg-pink-500 text-white p-1 rounded-full"><Icons.Star /></div>
                                <p className="text-gray-600 text-xs italic text-center leading-relaxed">
                                    "{CONFIG.depoimentos[depoimentoIndex].texto}"
                                </p>
                                <p className="text-center text-[10px] font-bold text-pink-400 mt-2 uppercase">- {CONFIG.depoimentos[depoimentoIndex].nome}</p>
                                
                                <div className="flex justify-center gap-1 mt-3">
                                    {CONFIG.depoimentos.map((_, idx) => (
                                        <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === depoimentoIndex ? 'w-4 bg-pink-400' : 'w-1.5 bg-pink-200'}`}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="fade-in">
                        <button onClick={() => setStep(1)} className="text-xs text-gray-400 mb-2 hover:text-pink-500 flex items-center gap-1">← Voltar</button>
                        <h2 className="text-xl font-bold text-gray-800 mb-1">Seus Dados e Horário</h2>
                        <p className="text-sm text-gray-500 mb-4">Agendando: <strong className="text-pink-500">{dados.servicoObj.nome}</strong></p>
                        
                        <div className="bg-pink-50 p-2 rounded-lg text-center mb-4 border border-pink-100">
                            <span className="text-xs uppercase font-bold text-gray-500 block mb-1">Tipo de Serviço</span>
                            <span className="text-lg font-bold text-pink-600 uppercase">{dados.tipoServico}</span>
                            <span className="block text-sm font-bold text-gray-700">Valor: R$ {dados.precoFinal},00</span>
                        </div>

                        {dados.tipoServico === 'manutencao' && (
                            <div className="mb-4 bg-purple-50 border border-purple-200 rounded-xl p-3 text-xs text-gray-700 leading-relaxed fade-in flex gap-2 items-start">
                                <div className="shrink-0 text-purple-500 pt-0.5"><Icons.Info /></div>
                                <div><strong>Sobre a Manutenção:</strong> Sugerimos uma manutenção a cada 15 a 20 dias para acompanhar o crescimento dos nossos fios naturais, mas olha, não é uma regra definitiva, viu? Quando sentir aquela coceirinha de manutenção, é só dar um grito!</div>
                            </div>
                        )}

                        <div className="mb-4 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                            <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase flex items-center gap-1">Antes de vir:</h3>
                            <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-600">
                                <div className="flex items-center gap-1"><Icons.Clock /><span className="text-[9px]">Duração: 1h30 a 2h30</span></div>
                                <div className="flex items-center gap-1"><Icons.EyeOff /><span className="text-[9px]">Sem Rímel</span></div>
                                <div className="flex items-center gap-1"><span className="text-xs">👓</span><span className="text-[9px]">Remover Lentes</span></div>
                                <div className="flex items-center gap-1"><span className="text-xs">⏰</span><span className="text-[9px]">Tolerância 15min</span></div>
                            </div>
                            <div className="mt-2 pt-2 border-t border-gray-100 text-[9px] text-red-400 leading-tight">⚠️ <strong>Contraindicações:</strong> Alergias, doenças oculares ativas (conjuntivite) ou pele extremamente sensível.</div>
                        </div>

                        <div className="space-y-3">
                            <input type="text" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-sm" placeholder="Seu Nome *" value={dados.nome} onChange={(e) => setDados({...dados, nome: e.target.value})} />
                            <input type="tel" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-sm" placeholder="WhatsApp *" value={dados.whatsapp} onChange={(e) => setDados({...dados, whatsapp: e.target.value})} />
                            <div className="flex gap-2">
                                <input type="email" className="flex-1 p-3 bg-gray-50 rounded-xl border border-gray-200 text-sm" placeholder="E-mail" value={dados.email} onChange={(e) => setDados({...dados, email: e.target.value})} />
                                <div className="w-1/3"><input type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-sm" placeholder="Niver" value={dados.nascimento} onChange={(e) => setDados({...dados, nascimento: e.target.value})} /></div>
                            </div>

                            <hr className="border-dashed border-gray-200 my-2"/>
                            
                            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                                <label className="block text-xs font-bold text-gray-500 mb-2">ONDE SERÁ O ATENDIMENTO?</label>
                                <div className="flex gap-2 mb-3">
                                    <button onClick={() => setDados({...dados, tipoAtendimento: 'studio'})} className={`flex-1 py-2 text-sm rounded-lg border font-medium flex items-center justify-center gap-2 ${dados.tipoAtendimento === 'studio' ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-500'}`}><Icons.Briefcase /> No Studio</button>
                                    <button onClick={() => setDados({...dados, tipoAtendimento: 'domicilio'})} className={`flex-1 py-2 text-sm rounded-lg border font-medium flex items-center justify-center gap-2 ${dados.tipoAtendimento === 'domicilio' ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-500'}`}><Icons.Home /> A Domicílio</button>
                                </div>
                                {dados.tipoAtendimento === 'domicilio' && (
                                    <div className="fade-in">
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-[10px] text-yellow-800 mb-2">⚠️ Taxa de Uber será cobrada.</div>
                                        <input type="text" className="w-full p-2 bg-white rounded-lg border text-sm mb-2" placeholder="Endereço *" value={dados.endereco} onChange={(e) => setDados({...dados, endereco: e.target.value})} />
                                        <input type="text" className="w-full p-2 bg-white rounded-lg border text-sm" placeholder="Complemento" value={dados.complemento} onChange={(e) => setDados({...dados, complemento: e.target.value})} />
                                    </div>
                                )}
                            </div>

                            <div className="pt-2">
                                <label className="block text-xs font-bold text-gray-500 mb-1">ESCOLHA DATA E HORA</label>
                                <input type="date" min={hoje} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 mb-3 font-bold text-gray-700" value={dados.data} onChange={(e) => setDados({...dados, data: e.target.value})} />
                                {dados.data && (
                                    <div>
                                        {carregandoHorarios ? (
                                            <div className="flex items-center justify-center gap-2 py-4 text-gray-400 text-sm"><div className="loader"></div> Verificando agenda...</div>
                                        ) : (
                                            <div className="grid grid-cols-4 gap-2 pb-2">
                                                {CONFIG.horarios.map((h) => {
                                                    const isOcupado = horariosOcupados.includes(h);
                                                    return (
                                                        <button key={h} disabled={isOcupado} onClick={() => handleCliqueHorario(h)} className={`py-2 text-xs rounded-lg font-bold transition-all border relative overflow-hidden ${isOcupado ? 'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed opacity-50' : dados.hora === h ? 'bg-pink-500 text-white border-pink-500 shadow-md transform scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'}`}>
                                                            {h}
                                                            {isOcupado && <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50"><span className="text-[8px] transform -rotate-12 bg-red-100 px-1 text-red-500 font-bold border border-red-200 rounded">OCUPADO</span></div>}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        )}
                                        <button onClick={() => setVendoAgenda(!vendoAgenda)} className="w-full mt-2 text-xs text-purple-400 hover:text-purple-600 underline flex items-center justify-center gap-1">{vendoAgenda ? 'Ocultar Calendário' : 'Ver Calendário Completo (Dúvida)'}</button>
                                        {vendoAgenda && <div className="mt-2 mb-4 rounded-xl overflow-hidden border border-gray-200 shadow-inner fade-in"><iframe src={CONFIG.linkAgendaPublicaGoogle} style={{border: 0}} width="100%" height="300" frameBorder="0" scrolling="no"></iframe></div>}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-center gap-4 text-gray-400 py-2 border-t border-gray-100">
                                <div className="flex flex-col items-center gap-1"><Icons.Smartphone /><span className="text-[8px]">Pix</span></div>
                                <div className="flex flex-col items-center gap-1"><Icons.CreditCard /><span className="text-[8px]">Cartão</span></div>
                                <div className="flex flex-col items-center gap-1"><Icons.Dollar /><span className="text-[8px]">Dinheiro</span></div>
                            </div>

                            {dados.hora && (
                                <div className="fade-in space-y-3 pt-2">
                                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-center">
                                        <p className="text-xs text-blue-800 mb-2">Dica: Adicione à sua agenda para não esquecer!</p>
                                        <button onClick={enviarInviteAgenda} className="w-full bg-white text-blue-600 font-bold py-2 rounded-lg border border-blue-200 hover:bg-blue-50 flex items-center justify-center gap-2 text-sm shadow-sm"><Icons.Calendar /> Adicionar ao Google Agenda</button>
                                    </div>
                                    <button onClick={enviarWhatsapp} className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-3 rounded-xl shadow-lg transform transition hover:-translate-y-1 flex items-center justify-center gap-2"><Icons.Whatsapp /> Enviar Pedido no Zap</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

                {showModalIA && ( <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 fade-in" onClick={() => setShowModalIA(false)}><div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl scale-in overflow-hidden relative" onClick={e => e.stopPropagation()}><div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white text-center"><h3 className="text-xl font-bold flex items-center justify-center gap-2"><Icons.Gemini /> Consultora IA</h3><p className="text-xs opacity-90">Me conte o que você procura...</p></div><div className="p-6">{!respostaIA ? (<><textarea className="w-full p-3 border border-gray-300 rounded-xl text-sm mb-4 focus:ring-2 focus:ring-purple-500 outline-none" rows="4" placeholder="Ex: Quero algo bem natural para usar no trabalho..." value={inputIA} onChange={(e) => setInputIA(e.target.value)}></textarea><button onClick={consultarEstiloIA} disabled={loadingIA || !inputIA.trim()} className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition-all flex justify-center items-center gap-2 disabled:opacity-50">{loadingIA ? <div className="loader border-white border-t-purple-600 w-4 h-4"></div> : '✨ Encontrar meu estilo'}</button></>) : (<div className="fade-in"><div className="bg-purple-50 p-4 rounded-xl border border-purple-100 mb-4"><p className="text-sm text-gray-700 italic">"{respostaIA.motivo}"</p></div>{respostaIA.id && (<button onClick={() => { const servico = CONFIG.servicos.find(s => s.id === respostaIA.id); if(servico) { setServicoExpandido(servico.id); setShowModalIA(false); } }} className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600 transition-all">Ver {CONFIG.servicos.find(s => s.id === respostaIA.id)?.nome}</button>)}<button onClick={() => setRespostaIA(null)} className="w-full mt-2 text-gray-400 text-xs underline">Tentar de novo</button></div>)}</div></div></div> )}
                {modalDetalhes && ( <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 fade-in" onClick={() => setModalDetalhes(null)}><div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl scale-in overflow-hidden relative" onClick={e => e.stopPropagation()}><button onClick={() => setModalDetalhes(null)} className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-1 z-10"><Icons.Close /></button><div className="h-64 bg-gray-100"><img src={modalDetalhes.imagem} alt={modalDetalhes.nome} className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/400x300/ec4899/FFFFFF?text=Foto'} /></div><div className="p-6"><h3 className="text-2xl font-bold text-gray-800 mb-2">{modalDetalhes.nome}</h3><div className="h-1 w-12 bg-pink-500 rounded mb-4"></div><p className="text-gray-600 text-sm leading-relaxed mb-6 text-justify">{modalDetalhes.fullDesc || modalDetalhes.desc}</p><button onClick={() => { setServicoExpandido(modalDetalhes.id); setModalDetalhes(null); }} className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600 transition-all shadow-lg flex items-center justify-center gap-2"><Icons.Check /> Escolher este modelo</button></div></div></div> )}
                {modalConfirmacao && ( <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 fade-in"><div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl scale-in text-center"><div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4"><Icons.Check /></div><h3 className="text-lg font-bold text-gray-800 mb-2">Confirmar Horário?</h3><p className="text-gray-600 text-sm mb-6">Você escolheu <strong>{horarioPendente}</strong>.<br/>Vamos prosseguir?</p><div className="flex flex-col gap-2"><button onClick={confirmarHorario} className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600">Sim, Confirmar</button><button onClick={() => setModalConfirmacao(false)} className="w-full bg-gray-100 text-gray-500 font-bold py-3 rounded-xl hover:bg-gray-200">Escolher outro</button></div></div></div> )}
        </div>
    );
}

function TelaProfissional({ onSair }) {
    const [aba, setAba] = useState('confirma'); 
    const getAmanha = () => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; };
    const [dataLote, setDataLote] = useState(getAmanha());
    const [listaClientes, setListaClientes] = useState([]);
    const [novoCliente, setNovoCliente] = useState({ nome: '', zap: '', hora: '', tipo: 'studio' });
    const [bancoClientes, setBancoClientes] = useState([]);
    const [loadingSync, setLoadingSync] = useState(false);
    const [sugestoes, setSugestoes] = useState([]);
    const [loadingPlanilha, setLoadingPlanilha] = useState(false);
    
    const [modalMsgIA, setModalMsgIA] = useState(null); 
    const [msgGeradaIA, setMsgGeradaIA] = useState('');
    const [loadingMsgIA, setLoadingMsgIA] = useState(false);
    const [postIA, setPostIA] = useState({ servico: '', tom: 'divertido', legenda: '' });

    const [modalAnaliseIA, setModalAnaliseIA] = useState(null);
    const [analiseIA, setAnaliseIA] = useState(null);

    useEffect(() => {
        const salvos = JSON.parse(localStorage.getItem('ls_clientes_db') || '[]');
        setBancoClientes(salvos);
    }, []);

    const baixarClientesPlanilha = async () => {
        if (!CONFIG.scriptGoogleUrl) {
            alert("⚠️ Configure a URL do Google Apps Script no código primeiro!");
            return;
        }
        setLoadingPlanilha(true);
        try {
            const response = await fetch(CONFIG.scriptGoogleUrl);
            const data = await response.json();
            
            if (data && Array.isArray(data)) {
                setBancoClientes(data);
                localStorage.setItem('ls_clientes_db', JSON.stringify(data));
                alert(`${data.length} clientes sincronizados da planilha!`);
            } else {
                alert("Formato de dados inválido ou planilha vazia.");
            }
        } catch (e) {
            console.error("Erro ao baixar da planilha", e);
            alert("Erro ao conectar com a planilha. Verifique a URL.");
        }
        setLoadingPlanilha(false);
    };
    
    const getDiasSemVisita = (dataUltimaVisita) => {
        if (!dataUltimaVisita) return 999;
        const ultima = new Date(dataUltimaVisita);
        const hoje = new Date();
        const diffTime = Math.abs(hoje - ultima);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    };

    const isAniversariante = (dataNasc) => {
        if (!dataNasc) return false;
        let dia, mes;
        if (dataNasc.includes('/')) {
            [dia, mes] = dataNasc.split('/');
        } else {
            [, mes, dia] = dataNasc.split('-');
        }
        const hoje = new Date();
        return parseInt(dia) === hoje.getDate() && parseInt(mes) === (hoje.getMonth() + 1);
    };
    
    const gerarMensagemSaudade = (cliente) => {
        const msg = `Oii ${cliente.nome}, sumida! 👻\nEstamos com saudades de você aqui no LS Cílios!\n\nQue tal agendar uma manutenção ou uma nova aplicação para renovar o olhar? 🥰\n\nMe chama aqui!`;
        const link = `https://wa.me/55${cliente.zap.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
        window.open(link, '_blank');
    };

    const gerarMensagemParabens = (cliente) => {
        const msg = `Parabéns ${cliente.nome}! 🎂🥳\nHoje é o seu dia e queremos te desejar muitas felicidades!\n\nComo presente, que tal vir ficar ainda mais linda com a gente? ✨`;
        const link = `https://wa.me/55${cliente.zap.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
        window.open(link, '_blank');
    };

    const gerarAnaliseCliente = async (cliente) => {
        setLoadingMsgIA(true);
        const diasSemVisita = getDiasSemVisita(cliente.ultima_visita);
        const hojeStr = new Date().toLocaleDateString();
        const visitaStr = cliente.ultima_visita ? new Date(cliente.ultima_visita).toLocaleDateString() : 'Nenhuma';

        const prompt = `Analise a cliente ${cliente.nome}. Última visita: ${visitaStr}. Hoje: ${hojeStr}. Dias sem visita: ${diasSemVisita}.
        Com base nisso, defina:
        1. Status do Ciclo (Recente / Manutenção / Recuperação).
        2. Uma mensagem de WhatsApp curta, carinhosa e estratégica para esse status.
        3. Uma dica de beleza rápida e útil sobre cuidados com cílios para enviar de brinde/conteúdo.
        Responda EXATAMENTE neste formato JSON: { "status": "string", "mensagem": "string", "dica": "string" }`;

        const resultado = await chamarGemini(prompt, "Você é um especialista em CRM de beleza.");
        
        if (resultado) {
            try {
                const cleanJson = resultado.replace(/```json|```/g, '').trim();
                const analise = JSON.parse(cleanJson);
                setAnaliseIA(analise);
            } catch (e) {
                console.error("Erro ao parsear JSON IA", e);
                setAnaliseIA({ status: "Erro", mensagem: "Não consegui analisar agora.", dica: "" });
            }
        }
        setLoadingMsgIA(false);
    };

    const enviarMensagemAnalise = (zap, msg) => {
            const link = `https://wa.me/55${zap.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
            window.open(link, '_blank');
    };

    const gerarLegendaInstagram = async () => {
            if (!postIA.servico) return;
            setLoadingMsgIA(true);
            const prompt = `Crie uma legenda para Instagram para uma Lash Designer.
            Serviço: ${postIA.servico}.
            Tom de voz: ${postIA.tom}.
            A legenda deve ser engajadora, usar emojis e hashtags relevantes (#cilios #extensaodecilios #lashextension).
            Fale sobre realçar o olhar e autoestima.`;
            
            const texto = await chamarGemini(prompt, "Você é um especialista em Marketing Digital para beleza.");
            if(texto) {
            setPostIA({...postIA, legenda: texto});
            }
            setLoadingMsgIA(false);
    };

    const handleNomeChange = (txt) => { setNovoCliente({...novoCliente, nome: txt}); if (txt.length > 1) { const matchs = bancoClientes.filter(c => c.nome.toLowerCase().includes(txt.toLowerCase())); setSugestoes(matchs); } else { setSugestoes([]); } };
    const selecionarSugestao = (cliente) => { setNovoCliente({...novoCliente, nome: cliente.nome, zap: cliente.zap}); setSugestoes([]); };
    const salvarClienteLocal = (novo) => { if(!novo.nome) return; const novaLista = [...bancoClientes, { ...novo, id: Date.now() }]; setBancoClientes(novaLista); localStorage.setItem('ls_clientes_db', JSON.stringify(novaLista)); };
    const adicionarNaLista = () => { if(!novoCliente.nome || !novoCliente.hora) return; const novoItem = { id: Date.now(), nome: novoCliente.nome, zap: novoCliente.zap, hora: novoCliente.hora, status: 'pendente', tipo: novoCliente.tipo }; setListaClientes([...listaClientes, novoItem].sort((a, b) => a.hora.localeCompare(b.hora))); setNovoCliente({ nome: '', zap: '', hora: '', tipo: 'studio' }); const existe = bancoClientes.some(c => c.nome.toLowerCase() === novoCliente.nome.toLowerCase()); if(!existe) { salvarClienteLocal({nome: novoCliente.nome, zap: novoCliente.zap}); } };
    const confirmarCliente = (cliente, mensagemPersonalizada = null) => { const dataFormatada = dataLote.split('-').reverse().slice(0, 2).join('/'); let msgPadrao = ""; if (cliente.tipo === 'domicilio') { msgPadrao = `Olá *${cliente.nome}*! 💖\nPassando para confirmar seu horário amanhã dia *${dataFormatada}* às *${cliente.hora}* aí na sua casa.\nTudo certo? Posso confirmar? 🚗💨`; } else { msgPadrao = `Olá *${cliente.nome}*! 💖\nPassando para confirmar seu horário amanhã dia *${dataFormatada}* às *${cliente.hora}* aqui no Studio.\nTudo certo? Posso confirmar? ✨`; } const msgFinal = mensagemPersonalizada || msgPadrao; const telLimpo = cliente.zap ? cliente.zap.replace(/\D/g, '') : ''; const linkBase = telLimpo ? `https://wa.me/55${telLimpo}` : `https://wa.me/`; window.open(`${linkBase}?text=${encodeURIComponent(msgFinal)}`, '_blank'); setListaClientes(listaClientes.map(c => c.id === cliente.id ? {...c, status: 'enviado'} : c)); setModalMsgIA(null); };
    const toggleTipoCliente = (id) => { setListaClientes(listaClientes.map(c => { if (c.id === id) { return { ...c, tipo: c.tipo === 'studio' ? 'domicilio' : 'studio' }; } return c; })); };
    const sincronizarGoogleAgenda = async () => { setLoadingSync(true); const eventos = await fetchICSAndParse(CONFIG.icalUrlPrivate, dataLote); const listaFinal = eventos.map(ev => { let hora = "Dia todo"; if (ev.localHour !== undefined && ev.localHour !== -1) { hora = (ev.localHour < 10 ? '0'+ev.localHour : ev.localHour) + ":00"; } const nomeProvavel = ev.summary ? ev.summary.split('-')[0].trim() : 'Sem título'; let zap = ''; const clienteSalvo = bancoClientes.find(c => c.nome.toLowerCase().includes(nomeProvavel.toLowerCase())); if(clienteSalvo) zap = clienteSalvo.zap; let tipo = 'studio'; if (ev.location && ev.location.length > 2) { tipo = 'domicilio'; } return { id: Date.now() + Math.random(), nome: nomeProvavel, zap: zap, hora: hora, status: 'pendente', tipo: tipo }; }); if (listaFinal.length > 0) { setListaClientes(listaFinal.sort((a, b) => a.hora.localeCompare(b.hora))); alert(`Encontrados ${listaFinal.length} agendamentos!`); } else { alert("Nenhum agendamento encontrado para esta data."); } setLoadingSync(false); };
    const gerarMensagemIA = async (cliente) => { setLoadingMsgIA(true); const dataFormatada = dataLote.split('-').reverse().slice(0, 2).join('/'); let contextoLocal = cliente.tipo === 'domicilio' ? "atendimento a domicílio (na casa da cliente)" : "atendimento no seu Studio"; const prompt = `Você é a Le, uma lash designer profissional. Escreva uma mensagem curta de WhatsApp para confirmar o agendamento de ${cliente.nome}. Data: Amanhã (${dataFormatada}) às ${cliente.hora}. Local: ${contextoLocal}. Se for domicílio, mencione que está indo até ela. Se for Studio, mencione 'aqui no Studio'. Use emojis fofos.`; const texto = await chamarGemini(prompt, "Você é um assistente pessoal."); if(texto) { setMsgGeradaIA(texto); } else { setMsgGeradaIA("Erro ao gerar mensagem. Tente novamente."); } setLoadingMsgIA(false); };

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100 fade-in relative min-h-[600px] flex flex-col">
            <button onClick={onSair} className="absolute top-4 right-4 text-white hover:text-red-200 z-10"><Icons.LogOut /></button>
            <div className="bg-purple-600 p-6 text-white">
                <h2 className="text-xl font-bold">Painel da Le</h2>
                <div className="flex gap-4 mt-4 text-xs font-bold overflow-x-auto whitespace-nowrap pb-2">
                    <button onClick={() => setAba('confirma')} className={`pb-1 border-b-2 transition-colors ${aba === 'confirma' ? 'border-white text-white' : 'border-transparent text-purple-300'}`}>CONFIRMAÇÕES</button>
                    <button onClick={() => setAba('clientes')} className={`pb-1 border-b-2 transition-colors ${aba === 'clientes' ? 'border-white text-white' : 'border-transparent text-purple-300'}`}>MEUS CLIENTES</button>
                    <button onClick={() => setAba('marketing')} className={`pb-1 border-b-2 transition-colors ${aba === 'marketing' ? 'border-white text-white' : 'border-transparent text-purple-300'}`}>MARKETING IA</button>
                </div>
            </div>

            {aba === 'confirma' && (
                <div className="p-4 flex-1 flex flex-col gap-4 fade-in">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <h3 className="font-bold text-gray-700 mb-2 text-sm">Sincronizar com Google Agenda:</h3>
                        <div className="flex gap-2 mb-2">
                            <input type="date" className="flex-1 p-2 rounded-lg border text-sm font-bold text-gray-600" value={dataLote} onChange={e => setDataLote(e.target.value)} />
                            <button onClick={sincronizarGoogleAgenda} className="bg-blue-600 text-white px-3 rounded-lg text-xs font-bold flex items-center gap-1 shadow hover:bg-blue-700">
                                {loadingSync ? '...' : <Icons.Refresh />} Buscar
                            </button>
                        </div>
                        
                        <hr className="border-gray-200 mb-3"/>
                        
                        <p className="text-xs font-bold text-gray-500 mb-2">Adicionar na Lista:</p>
                        <div className="flex gap-2 mb-2 relative">
                            <input type="text" placeholder="Nome..." className="flex-1 p-2 rounded-lg border text-sm" value={novoCliente.nome} onChange={e => handleNomeChange(e.target.value)} />
                            {sugestoes.length > 0 && (
                                <div className="absolute top-10 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-40 overflow-y-auto">
                                    {sugestoes.map(s => (
                                        <button key={s.id} onClick={() => selecionarSugestao(s)} className="w-full text-left p-2 hover:bg-purple-50 text-xs text-gray-700 border-b"><strong>{s.nome}</strong></button>
                                    ))}
                                </div>
                            )}
                            <input type="time" className="w-20 p-2 rounded-lg border text-sm" value={novoCliente.hora} onChange={e => setNovoCliente({...novoCliente, hora: e.target.value})} />
                        </div>
                        <input type="tel" placeholder="WhatsApp" className="w-full p-2 mb-2 rounded-lg border text-sm bg-gray-100" value={novoCliente.zap} onChange={e => setNovoCliente({...novoCliente, zap: e.target.value})} />
                        <button onClick={adicionarNaLista} className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg text-sm shadow-sm"><Icons.Plus /> Adicionar</button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <h3 className="font-bold text-gray-700 mb-2 text-sm">Lista de Envio:</h3>
                        <div className="space-y-2">
                            {listaClientes.map((cliente) => (
                                <div key={cliente.id} className={`p-3 rounded-xl border flex flex-col gap-2 ${cliente.status === 'enviado' ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-sm text-gray-800">{cliente.nome}</p>
                                            <span className="bg-gray-100 text-xs px-1.5 rounded text-gray-600">{cliente.hora}</span>
                                        </div>
                                        
                                        {/* Toggle Local */}
                                        <button 
                                            onClick={() => toggleTipoCliente(cliente.id)}
                                            className={`text-xs font-bold px-2 py-1 rounded border flex items-center gap-1 ${cliente.tipo === 'domicilio' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-purple-50 text-purple-700 border-purple-200'}`}
                                        >
                                            {cliente.tipo === 'domicilio' ? <><Icons.Home /> Casa</> : <><Icons.Briefcase /> Studio</>}
                                        </button>
                                    </div>

                                    <div className="flex gap-2 mt-1">
                                        <button onClick={() => setListaClientes(listaClientes.filter(c => c.id !== cliente.id))} className="text-gray-300 hover:text-red-500 p-2"><Icons.Trash /></button>
                                        
                                        {/* Botão IA */}
                                        <button 
                                            onClick={() => {
                                                setModalMsgIA(cliente);
                                                gerarMensagemIA(cliente);
                                            }} 
                                            className="bg-purple-100 text-purple-600 p-2 rounded-lg hover:bg-purple-200 flex-1 flex justify-center" title="Gerar msg com IA"
                                        >
                                            <Icons.Gemini />
                                        </button>

                                        <button onClick={() => confirmarCliente(cliente)} className={`flex-1 py-1 rounded-lg font-bold text-xs flex items-center justify-center gap-1 ${cliente.status === 'enviado' ? 'bg-green-100 text-green-600' : 'bg-green-500 text-white'}`}>{cliente.status === 'enviado' ? 'Enviado' : <Icons.Whatsapp />}</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            
            {aba === 'clientes' && (
                <div className="p-4 flex-1 flex flex-col gap-4 fade-in">
                    
                    {/* Botão de Sincronização com Planilha */}
                    <button 
                        onClick={baixarClientesPlanilha}
                        disabled={loadingPlanilha}
                        className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-all flex justify-center items-center gap-2 shadow-lg mb-2"
                    >
                        {loadingPlanilha ? <div className="loader border-white border-t-green-600 w-4 h-4"></div> : <><Icons.CloudDownload /> Atualizar da Planilha</>}
                    </button>
                    <p className="text-[10px] text-gray-400 text-center mb-2">Puxa todos os contatos que já agendaram pelo app.</p>

                    <div className="flex-1 overflow-y-auto">
                        <h3 className="font-bold text-gray-700 mb-2 text-sm">Cadastros ({bancoClientes.length}):</h3>
                        {bancoClientes.map((c) => {
                            const diasSumida = getDiasSemVisita(c.ultima_visita);
                            const isNiver = isAniversariante(c.nascimento);
                            const isSumida = diasSumida > 45;

                            return (
                                <div key={c.id || Math.random()} className={`p-3 rounded-xl border text-xs mb-2 relative ${isNiver ? 'bg-pink-50 border-pink-200' : 'bg-white border-gray-200'}`}>
                                    
                                    {/* Badge Niver */}
                                    {isNiver && <span className="absolute top-2 right-2 bg-pink-500 text-white text-[9px] px-2 py-0.5 rounded-full animate-bounce">🎂 Niver Hoje!</span>}
                                    
                                    {/* Badge Sumida */}
                                    {!isNiver && isSumida && <span className="absolute top-2 right-2 bg-gray-200 text-gray-500 text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1">👻 Sumida ({diasSumida}d)</span>}

                                    <p className="font-bold text-sm text-gray-800">{c.nome}</p>
                                    <p className="text-gray-500">Zap: {c.zap || '-'}</p>
                                    {c.ultima_visita && <p className="text-gray-400 text-[10px]">Última vez: {new Date(c.ultima_visita).toLocaleDateString()}</p>}
                                    
                                    {/* Ações CRM */}
                                    <div className="flex gap-2 mt-2">
                                        {/* Botão Novo: Analisar */}
                                        <button 
                                            onClick={() => { setModalAnaliseIA(c); gerarAnaliseCliente(c); }}
                                            className="flex-1 bg-purple-100 text-purple-600 py-1 rounded text-[10px] font-bold hover:bg-purple-200 flex items-center justify-center gap-1"
                                        >
                                            ✨ Analisar
                                        </button>

                                        {isNiver && (
                                            <button onClick={() => gerarMensagemParabens(c)} className="flex-1 bg-pink-100 text-pink-600 py-1 rounded text-[10px] font-bold hover:bg-pink-200">
                                                Parabéns 🎉
                                            </button>
                                        )}
                                        {isSumida && !isNiver && (
                                            <button onClick={() => gerarMensagemSaudade(c)} className="flex-1 bg-gray-100 text-gray-600 py-1 rounded text-[10px] font-bold hover:bg-gray-200">
                                                Mandar Oi Sumida 👋
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            
            {/* ABA MARKETING IA (NOVA) */}
            {aba === 'marketing' && (
                <div className="p-4 flex-1 flex flex-col gap-4 fade-in">
                        <div className="bg-pink-50 p-4 rounded-xl border border-pink-200">
                            <h3 className="font-bold text-pink-700 text-sm mb-3 flex items-center gap-2"><Icons.Gemini /> Gerador de Legenda</h3>
                            
                            <label className="text-xs font-bold text-gray-500">Sobre qual serviço?</label>
                            <select className="w-full p-2 mb-3 rounded border text-sm" value={postIA.servico} onChange={(e) => setPostIA({...postIA, servico: e.target.value})}>
                                <option value="">Selecione...</option>
                                {CONFIG.servicos.map(s => <option key={s.id} value={s.nome}>{s.nome}</option>)}
                            </select>
                            
                            <label className="text-xs font-bold text-gray-500">Qual o tom?</label>
                            <select className="w-full p-2 mb-3 rounded border text-sm" value={postIA.tom} onChange={(e) => setPostIA({...postIA, tom: e.target.value})}>
                                <option value="Divertido">Divertido 😄</option>
                                <option value="Profissional">Profissional 💼</option>
                                <option value="Inspirador">Inspirador ✨</option>
                                <option value="Promocional">Promocional 🏷️</option>
                            </select>
                            
                            <button onClick={gerarLegendaInstagram} disabled={loadingMsgIA || !postIA.servico} className="w-full bg-pink-500 text-white font-bold py-2 rounded-lg text-sm hover:bg-pink-600 disabled:opacity-50">
                                {loadingMsgIA ? 'Criando mágica...' : '✨ Criar Legenda'}
                            </button>
                        </div>
                        
                        {postIA.legenda && (
                            <div className="flex-1 bg-white p-4 rounded-xl border border-gray-200 flex flex-col relative fade-in">
                                <h4 className="text-xs font-bold text-gray-500 mb-2">Resultado:</h4>
                                <textarea className="w-full flex-1 p-2 bg-gray-50 rounded border text-sm mb-2" value={postIA.legenda} readOnly></textarea>
                                <button 
                                    onClick={() => { navigator.clipboard.writeText(postIA.legenda); alert("Copiado!"); }} 
                                    className="absolute top-4 right-4 text-gray-400 hover:text-purple-600" title="Copiar"
                                >
                                    <Icons.Copy />
                                </button>
                            </div>
                        )}
                </div>
            )}

            {/* MODAL MENSAGEM IA */}
            {modalMsgIA && (
                <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 fade-in">
                    <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden">
                        <div className="bg-purple-600 p-3 text-white flex justify-between items-center">
                            <h3 className="font-bold text-sm flex gap-2"><Icons.Gemini /> Mensagem Inteligente</h3>
                            <button onClick={() => setModalMsgIA(null)}><Icons.Close /></button>
                        </div>
                        <div className="p-4">
                            {loadingMsgIA ? (
                                <div className="flex justify-center py-8"><div className="loader border-purple-200 border-t-purple-600"></div></div>
                            ) : (
                                <>
                                    <textarea className="w-full h-32 p-3 border rounded-lg text-sm mb-3 bg-gray-50" value={msgGeradaIA} onChange={(e) => setMsgGeradaIA(e.target.value)}></textarea>
                                    <div className="flex gap-2">
                                        <button onClick={() => gerarMensagemIA(modalMsgIA)} className="flex-1 py-2 border border-purple-200 text-purple-600 rounded-lg text-xs font-bold hover:bg-purple-50">Regerar</button>
                                        <button onClick={() => confirmarCliente(modalMsgIA, msgGeradaIA)} className="flex-1 py-2 bg-green-500 text-white rounded-lg text-xs font-bold hover:bg-green-600 flex justify-center items-center gap-1">Enviar <Icons.Whatsapp /></button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL ANALISE DE PERFIL IA (NOVO) */}
            {modalAnaliseIA && (
                <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 fade-in" onClick={() => setModalAnaliseIA(null)}>
                    <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden relative" onClick={e => e.stopPropagation()}>
                        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white">
                            <button onClick={() => setModalAnaliseIA(null)} className="absolute top-4 right-4"><Icons.Close /></button>
                            <h3 className="font-bold text-lg flex gap-2 items-center"><Icons.Analysis /> Análise de Perfil</h3>
                            <p className="text-xs opacity-90">{modalAnaliseIA.nome}</p>
                        </div>
                        <div className="p-5 space-y-4">
                            {loadingMsgIA ? (
                                <div className="flex flex-col items-center py-8 gap-3">
                                    <div className="loader border-purple-200 border-t-purple-600"></div>
                                    <p className="text-xs text-gray-500">Analisando ciclo da cliente...</p>
                                </div>
                            ) : analiseIA ? (
                                <>
                                    <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg border border-purple-100">
                                        <div className="text-2xl">📊</div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold">Status Atual</p>
                                            <p className="text-sm font-bold text-purple-700">{analiseIA.status}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-gray-500 mb-1 flex gap-1 items-center"><Icons.Sparkles /> Sugestão de Mimo (Dica)</p>
                                        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-xs text-gray-700 italic">
                                            "{analiseIA.dica}"
                                        </div>
                                        <button 
                                            onClick={() => enviarMensagemAnalise(modalAnaliseIA.zap, `Oi ${modalAnaliseIA.nome}! ✨ Lembrei de você com essa dica: ${analiseIA.dica}`)}
                                            className="w-full mt-2 text-xs text-yellow-600 font-bold hover:underline text-right"
                                        >
                                            Enviar Dica 🎁
                                        </button>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-gray-500 mb-1 flex gap-1 items-center"><Icons.Whatsapp /> Mensagem Estratégica</p>
                                        <textarea 
                                            className="w-full h-24 p-3 border rounded-lg text-sm bg-gray-50"
                                            value={analiseIA.mensagem}
                                            readOnly
                                        ></textarea>
                                        <button 
                                            onClick={() => enviarMensagemAnalise(modalAnaliseIA.zap, analiseIA.mensagem)}
                                            className="w-full mt-2 bg-green-500 text-white py-2 rounded-lg text-xs font-bold hover:bg-green-600 flex justify-center gap-2"
                                        >
                                            Enviar Agora <Icons.Whatsapp />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p className="text-center text-gray-500 text-sm">Não foi possível gerar a análise.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);