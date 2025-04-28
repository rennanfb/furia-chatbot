import Player from './player.js';

class Team {
    constructor() {
        this.players = [
        new Player("FalleN", "1", "Rifler(Líder)", [
            `Nascido em 30 de maio de 1991, hoje com 33 anos, o verdadeiro nome de FalleN é Gabriel Toledo.`,

            `Ficou famoso por liderar as equipes com as quais venceu dois Majors. Ele foi o cérebro por trás 
            da era de ouro do CS brasileiro, conquistando diversas vitórias, além de ser um dos melhores IGLs da história,
            também é um AWP extremamente técnico.`,

            `Fora do servidor, é um mentor e referência para as novas gerações.`]),

        new Player("yuurih", "2", "Rifler", [
            `Brasileiro nascido em 22 de dezembro de 1999, hoje com 25 anos, o verdadeiro nome de Yuurih é Yuri Santos.`,

            `Yuurih se juntou à FURIA em 2017 e rapidamente virou referência no cenário brasileiro. Sua precisão, 
            calma nos clutchs e versatilidade tática o tornaram indispensável.`,

            `Participou de diversos Majors e ajudou a colocar o Brasil de volta no topo do CS.`, 

            `É visto como um dos riflers mais consistentes da história da FURIA.`]),

        new Player("KSCERATO", "3", "Rifler", [
            `Brasileiro nascido em 12 de setembro de 1999, hoje com 25 anos, o verdadeiro nome de KSCERATO é Kaike Cerato.`, 

            `KSCERATO foi promovido da FURIA Academy em 2018 e virou estrela quase instantaneamente. É conhecido pela frieza 
            nos rounds decisivos e excelente controle de spray.`,

            `Se tornou um dos principais nomes do CS brasileiro na era moderna. Sua dedicação e postura competitiva inspiram novos talentos na cena.`]),

        new Player("molodoy", "4", "AWPer", [
            `Cazaque nascido em 10 de janeiro de 2005, hoje com 20 anos, o verdadeiro nome de molodoy é Danil Golubenko.`,

            `molodoy é um AWPer de 20 anos, revelado pela equipe AMKAL em 2025. Destacou-se por sua agressividade 
            e mira precisa, chamando atenção da FURIA.`,

            `Foi contratado pela FURIA em abril de 2025 para substituir chelo no elenco. 
            Sua chegada marca a entrada da FURIA no cenário internacional de CS2.`]),

        new Player("YEKINDAR", "5", "Rifler", [ 
            `Letão nascido em 4 de outubro de 1999, hoje com 25 anos, o verdadeiro nome de YEKINDAR é Mareks Gaļinskis.`,

            `YEKINDAR é da Letônia e ficou famoso na Virtus.pro por sua agressividade e confiança. Foi peça vital na reestruturação 
            da Team Liquid após sua entrada na lineup internacional.`,

            `Ele também é conhecido por contribuir com mid-round calls e leitura de jogo.
            Sua performance em entry frags é considerada uma das melhores do mundo.`]),

        new Player("sidde", "6", "Treinador", [
            `Brasileiro nascido em 6 de fevereiro de 1997, hoje com 28 anos, o verdadeiro nome de sidde é Sid Macedo. `,

            `Sidde é treinador técnico, focado em disciplina, tática e comunicação do time. Ele atua diretamente na leitura de mapas 
            e na análise dos adversários pré-jogo.`,

            `Seu trabalho inclui ajustar posicionamentos e preparar táticas para cada situação. `,

            `Com perfil estratégico e calmo, é peça-chave na evolução do time durante torneios.`]),

        new Player("Hepa", "7", "Treinador Assistente", [
            `Brasileiro nascido em 27 de dezembro de 1992, hoje com 32 anos, o verdadeiro nome de Hepa é Juan Borges.`,
            
            `Heppa é conhecido por sua inteligência tática e leitura precisa de rounds. Ele auxilia o IGL com sugestões de jogadas 
            e otimização das rotações no mapa.`,

            `Forte em análises pós-jogo, ele cria relatórios para corrigir falhas recorrentes.`,

            `Seu estilo metódico e atento faz dele um coach estratégico respeitado no cenário.`])
        ];
    }

    getPlayerById(id) {
        return this.players.find(player => player.id === id);
    }

    getPlayers() {
        return this.players;
    }
}

export default Team;