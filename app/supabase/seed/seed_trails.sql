-- ═══════════════════════════════════════
-- DOMINIA — SEED DATA (10 Trilhas + Lições)
-- ═══════════════════════════════════════

-- TRILHA 1: O que é IA?
INSERT INTO public.trails (title, description, slug, icon_name, order_index, is_published) VALUES
('O que é IA?', 'Fundamentos de Inteligência Artificial explicados de forma simples e divertida', 'o-que-e-ia', 'Brain', 1, true);

INSERT INTO public.lessons (trail_id, title, slug, description, type, xp_reward, order_index) VALUES
((SELECT id FROM trails WHERE slug = 'o-que-e-ia'), 'O que é Inteligência Artificial?', 'o-que-e-inteligencia-artificial', 'Descubra o que realmente é IA e como ela já faz parte da sua vida', 'Game', 10, 1),
((SELECT id FROM trails WHERE slug = 'o-que-e-ia'), 'IA Forte vs IA Fraca', 'ia-forte-vs-ia-fraca', 'Entenda a diferença entre os tipos de IA', 'Game', 10, 2),
((SELECT id FROM trails WHERE slug = 'o-que-e-ia'), 'Machine Learning Simplificado', 'machine-learning-simplificado', 'Como as máquinas realmente aprendem', 'Game', 15, 3),
((SELECT id FROM trails WHERE slug = 'o-que-e-ia'), 'Redes Neurais para Leigos', 'redes-neurais-para-leigos', 'O cérebro digital explicado com analogias', 'Game', 15, 4),
((SELECT id FROM trails WHERE slug = 'o-que-e-ia'), 'Processamento de Linguagem Natural', 'processamento-linguagem-natural', 'Como a IA entende o que você escreve', 'Game', 15, 5),
((SELECT id FROM trails WHERE slug = 'o-que-e-ia'), 'Visão Computacional', 'visao-computacional', 'Como a IA entende imagens e vídeos', 'Game', 15, 6),
((SELECT id FROM trails WHERE slug = 'o-que-e-ia'), 'IA Generativa: A Revolução', 'ia-generativa-a-revolucao', 'O que mudou com ChatGPT, DALL-E e Sora', 'Game', 20, 7),
((SELECT id FROM trails WHERE slug = 'o-que-e-ia'), 'Ética e IA', 'etica-e-ia', 'Os dilemas morais da inteligência artificial', 'Theory', 10, 8),
((SELECT id FROM trails WHERE slug = 'o-que-e-ia'), 'O Futuro da IA', 'o-futuro-da-ia', 'Para onde estamos caminhando', 'Theory', 10, 9),
((SELECT id FROM trails WHERE slug = 'o-que-e-ia'), '🐉 Boss: Foundations of AI', 'boss-foundations-of-ai', 'Desafio final: prove que você domina os fundamentos', 'Boss', 50, 10);

-- TRILHA 2: ChatGPT & Assistentes
INSERT INTO public.trails (title, description, slug, icon_name, order_index, is_published) VALUES
('ChatGPT & Assistentes', 'Domine a IA conversacional e se torne um mestre em prompts', 'chatgpt-assistentes', 'MessageCircle', 2, true);

INSERT INTO public.lessons (trail_id, title, slug, description, type, xp_reward, order_index) VALUES
((SELECT id FROM trails WHERE slug = 'chatgpt-assistentes'), 'O que é o ChatGPT?', 'o-que-e-chatgpt', 'Conheça o assistente de IA mais popular do mundo', 'Game', 10, 1),
((SELECT id FROM trails WHERE slug = 'chatgpt-assistentes'), 'Seu Primeiro Prompt', 'seu-primeiro-prompt', 'Aprenda a conversar com a IA de forma eficiente', 'Game', 10, 2),
((SELECT id FROM trails WHERE slug = 'chatgpt-assistentes'), 'Anatomia de um Bom Prompt', 'anatomia-bom-prompt', 'Estrutura, contexto e especificidade', 'Game', 15, 3),
((SELECT id FROM trails WHERE slug = 'chatgpt-assistentes'), 'Técnicas Avançadas de Prompt', 'tecnicas-avancadas-prompt', 'Chain-of-thought, few-shot, role-playing', 'Game', 20, 4),
((SELECT id FROM trails WHERE slug = 'chatgpt-assistentes'), 'GPT para Textos', 'gpt-para-textos', 'Escreva e-mails, posts e artigos com IA', 'Game', 15, 5),
((SELECT id FROM trails WHERE slug = 'chatgpt-assistentes'), 'GPT para Estudos', 'gpt-para-estudos', 'Use IA como tutor pessoal', 'Game', 15, 6),
((SELECT id FROM trails WHERE slug = 'chatgpt-assistentes'), 'GPT para Negócios', 'gpt-para-negocios', 'Automatize tarefas e aumente produtividade', 'Game', 15, 7),
((SELECT id FROM trails WHERE slug = 'chatgpt-assistentes'), 'GPT para Código', 'gpt-para-codigo', 'Programe com assistência de IA', 'Game', 20, 8),
((SELECT id FROM trails WHERE slug = 'chatgpt-assistentes'), 'Custom GPTs', 'custom-gpts', 'Crie seus próprios assistentes personalizados', 'Game', 20, 9),
((SELECT id FROM trails WHERE slug = 'chatgpt-assistentes'), 'Prompts Avançados na Prática', 'prompts-avancados-pratica', 'Aplique tudo que aprendeu em cenários reais', 'Game', 15, 10),
((SELECT id FROM trails WHERE slug = 'chatgpt-assistentes'), 'API do ChatGPT', 'api-chatgpt', 'Integre IA nos seus projetos', 'Game', 25, 11),
((SELECT id FROM trails WHERE slug = 'chatgpt-assistentes'), '🐉 Boss: Prompt Master', 'boss-prompt-master', 'Desafio final: crie o prompt perfeito', 'Boss', 50, 12);

-- TRILHA 3: Gemini, Claude & Outros
INSERT INTO public.trails (title, description, slug, icon_name, order_index, is_published) VALUES
('Gemini, Claude & Outros', 'Compare e use múltiplas IAs para resultados melhores', 'gemini-claude-outros', 'Bot', 3, true);

INSERT INTO public.lessons (trail_id, title, slug, description, type, xp_reward, order_index) VALUES
((SELECT id FROM trails WHERE slug = 'gemini-claude-outros'), 'Google Gemini', 'google-gemini', 'O assistente multimodal do Google', 'Game', 10, 1),
((SELECT id FROM trails WHERE slug = 'gemini-claude-outros'), 'Anthropic Claude', 'anthropic-claude', 'IA segura e de alta qualidade', 'Game', 10, 2),
((SELECT id FROM trails WHERE slug = 'gemini-claude-outros'), 'Meta Llama', 'meta-llama', 'IA open-source de última geração', 'Game', 10, 3),
((SELECT id FROM trails WHERE slug = 'gemini-claude-outros'), 'Mistral & DeepSeek', 'mistral-deepseek', 'Alternativas poderosas e acessíveis', 'Game', 15, 4),
((SELECT id FROM trails WHERE slug = 'gemini-claude-outros'), 'Comparativo: Qual Usar?', 'comparativo-qual-usar', 'Prós e contras de cada modelo', 'Game', 15, 5),
((SELECT id FROM trails WHERE slug = 'gemini-claude-outros'), 'Multi-IA: Estratégia Combinada', 'multi-ia-estrategia', 'Use múltiplas IAs juntas para melhores resultados', 'Game', 20, 6),
((SELECT id FROM trails WHERE slug = 'gemini-claude-outros'), 'Perplexity AI', 'perplexity-ai', 'Pesquisa com IA em tempo real', 'Game', 15, 7),
((SELECT id FROM trails WHERE slug = 'gemini-claude-outros'), 'IAs Locais (Ollama)', 'ias-locais-ollama', 'Rode IA no seu computador sem internet', 'Game', 20, 8),
((SELECT id FROM trails WHERE slug = 'gemini-claude-outros'), 'Avaliando Modelos', 'avaliando-modelos', 'Como medir a qualidade de uma IA', 'Theory', 10, 9),
((SELECT id FROM trails WHERE slug = 'gemini-claude-outros'), '🐉 Boss: AI Arena', 'boss-ai-arena', 'Desafio final: escolha a IA certa para cada tarefa', 'Boss', 50, 10);

-- TRILHA 4: Imagens com IA
INSERT INTO public.trails (title, description, slug, icon_name, order_index, is_published) VALUES
('Imagens com IA', 'Crie imagens profissionais com Midjourney, DALL-E e Flux', 'imagens-com-ia', 'Image', 4, true);

INSERT INTO public.lessons (trail_id, title, slug, description, type, xp_reward, order_index) VALUES
((SELECT id FROM trails WHERE slug = 'imagens-com-ia'), 'Introdução à Geração de Imagens', 'intro-geracao-imagens', 'Como a IA cria imagens do zero', 'Game', 10, 1),
((SELECT id FROM trails WHERE slug = 'imagens-com-ia'), 'DALL-E na Prática', 'dall-e-na-pratica', 'Crie imagens com o gerador da OpenAI', 'Game', 15, 2),
((SELECT id FROM trails WHERE slug = 'imagens-com-ia'), 'Midjourney Básico', 'midjourney-basico', 'Primeiros passos no Midjourney', 'Game', 15, 3),
((SELECT id FROM trails WHERE slug = 'imagens-com-ia'), 'Prompts Visuais Avançados', 'prompts-visuais-avancados', 'Domine a arte de descrever imagens para IA', 'Game', 20, 4),
((SELECT id FROM trails WHERE slug = 'imagens-com-ia'), 'Flux & Leonardo AI', 'flux-leonardo', 'Alternativas gratuitas e poderosas', 'Game', 15, 5),
((SELECT id FROM trails WHERE slug = 'imagens-com-ia'), 'Estilos Artísticos com IA', 'estilos-artisticos', 'Fotorrealismo, anime, 3D, pixel art e mais', 'Game', 15, 6),
((SELECT id FROM trails WHERE slug = 'imagens-com-ia'), 'Edição e Inpainting', 'edicao-inpainting', 'Edite e corrija imagens geradas', 'Game', 15, 7),
((SELECT id FROM trails WHERE slug = 'imagens-com-ia'), 'IA para Design Gráfico', 'ia-design-grafico', 'Logos, banners, posts para redes sociais', 'Game', 20, 8),
((SELECT id FROM trails WHERE slug = 'imagens-com-ia'), 'IA para Fotografia', 'ia-fotografia', 'Mockups, produtos, cenários profissionais', 'Game', 15, 9),
((SELECT id FROM trails WHERE slug = 'imagens-com-ia'), 'Consistência Visual', 'consistencia-visual', 'Mantenha estilo e identidade em múltiplas gerações', 'Game', 20, 10),
((SELECT id FROM trails WHERE slug = 'imagens-com-ia'), 'Direitos Autorais e IA', 'direitos-autorais', 'Aspectos legais do uso de imagens geradas', 'Theory', 10, 11),
((SELECT id FROM trails WHERE slug = 'imagens-com-ia'), '🐉 Boss: Visual Creator', 'boss-visual-creator', 'Desafio final: crie uma peça visual completa', 'Boss', 50, 12);

-- TRILHA 5: Vídeos com IA
INSERT INTO public.trails (title, description, slug, icon_name, order_index, is_published) VALUES
('Vídeos com IA', 'Crie vídeos impressionantes com Sora, Runway e Kling', 'videos-com-ia', 'Video', 5, true);

INSERT INTO public.lessons (trail_id, title, slug, description, type, xp_reward, order_index) VALUES
((SELECT id FROM trails WHERE slug = 'videos-com-ia'), 'IA para Vídeo: Panorama', 'ia-video-panorama', 'O estado atual da geração de vídeo com IA', 'Game', 10, 1),
((SELECT id FROM trails WHERE slug = 'videos-com-ia'), 'Runway ML', 'runway-ml', 'Edição e geração de vídeo profissional', 'Game', 15, 2),
((SELECT id FROM trails WHERE slug = 'videos-com-ia'), 'Kling AI', 'kling-ai', 'Vídeos realistas e criativos', 'Game', 15, 3),
((SELECT id FROM trails WHERE slug = 'videos-com-ia'), 'Sora da OpenAI', 'sora-openai', 'O gerador de vídeo mais avançado', 'Game', 20, 4),
((SELECT id FROM trails WHERE slug = 'videos-com-ia'), 'Prompts para Vídeo', 'prompts-para-video', 'Como descrever cenas e movimentos', 'Game', 15, 5),
((SELECT id FROM trails WHERE slug = 'videos-com-ia'), 'HeyGen & Avatares', 'heygen-avatares', 'Crie apresentadores virtuais', 'Game', 15, 6),
((SELECT id FROM trails WHERE slug = 'videos-com-ia'), 'ElevenLabs & Voz', 'elevenlabs-voz', 'Narração e dublagem com IA', 'Game', 15, 7),
((SELECT id FROM trails WHERE slug = 'videos-com-ia'), 'Edição Automática', 'edicao-automatica', 'Ferramentas que editam sozinhas', 'Game', 15, 8),
((SELECT id FROM trails WHERE slug = 'videos-com-ia'), 'Workflow Completo', 'workflow-video-completo', 'Do roteiro ao vídeo publicado', 'Game', 20, 9),
((SELECT id FROM trails WHERE slug = 'videos-com-ia'), '🐉 Boss: Video Producer', 'boss-video-producer', 'Desafio final: produza um vídeo completo', 'Boss', 50, 10);

-- TRILHA 6: Textos & Copy com IA
INSERT INTO public.trails (title, description, slug, icon_name, order_index, is_published) VALUES
('Textos & Copy com IA', 'Escreva posts, e-mails e roteiros que convertem', 'textos-copy-ia', 'BookOpen', 6, true);

INSERT INTO public.lessons (trail_id, title, slug, description, type, xp_reward, order_index) VALUES
((SELECT id FROM trails WHERE slug = 'textos-copy-ia'), 'IA como Escritor', 'ia-como-escritor', 'Use IA para escrever melhor e mais rápido', 'Game', 10, 1),
((SELECT id FROM trails WHERE slug = 'textos-copy-ia'), 'Copywriting com IA', 'copywriting-ia', 'Textos que vendem usando ChatGPT', 'Game', 15, 2),
((SELECT id FROM trails WHERE slug = 'textos-copy-ia'), 'E-mails Profissionais', 'emails-profissionais', 'Templates e automações de e-mail', 'Game', 10, 3),
((SELECT id FROM trails WHERE slug = 'textos-copy-ia'), 'Posts para Redes Sociais', 'posts-redes-sociais', 'Crie conteúdo viral com ajuda da IA', 'Game', 15, 4),
((SELECT id FROM trails WHERE slug = 'textos-copy-ia'), 'Blog Posts com SEO', 'blog-posts-seo', 'Artigos otimizados para Google', 'Game', 20, 5),
((SELECT id FROM trails WHERE slug = 'textos-copy-ia'), 'Roteiros de Vídeo', 'roteiros-video', 'Crie roteiros para YouTube e Reels', 'Game', 15, 6),
((SELECT id FROM trails WHERE slug = 'textos-copy-ia'), 'Storytelling com IA', 'storytelling-ia', 'Conte histórias que engajam', 'Game', 15, 7),
((SELECT id FROM trails WHERE slug = 'textos-copy-ia'), 'Revisão e Edição com IA', 'revisao-edicao-ia', 'Use IA como editor profissional', 'Game', 10, 8),
((SELECT id FROM trails WHERE slug = 'textos-copy-ia'), 'Tom de Voz e Marca', 'tom-voz-marca', 'Mantenha consistência na comunicação', 'Game', 15, 9),
((SELECT id FROM trails WHERE slug = 'textos-copy-ia'), '🐉 Boss: Copy Legend', 'boss-copy-legend', 'Desafio final: crie uma campanha completa', 'Boss', 50, 10);

-- TRILHA 7: Instagram + IA
INSERT INTO public.trails (title, description, slug, icon_name, order_index, is_published) VALUES
('Instagram + IA', 'Domine Reels, Stories e Carrosséis com inteligência artificial', 'instagram-ia', 'Instagram', 7, true);

INSERT INTO public.lessons (trail_id, title, slug, description, type, xp_reward, order_index) VALUES
((SELECT id FROM trails WHERE slug = 'instagram-ia'), 'Estratégia de Conteúdo com IA', 'estrategia-conteudo-ia', 'Planeje 30 dias de conteúdo em minutos', 'Game', 15, 1),
((SELECT id FROM trails WHERE slug = 'instagram-ia'), 'Carrosséis que Viralizam', 'carrosseis-viralizam', 'Estrutura e design com IA', 'Game', 15, 2),
((SELECT id FROM trails WHERE slug = 'instagram-ia'), 'Reels com Roteiro IA', 'reels-roteiro-ia', 'Roteiros prontos para gravar', 'Game', 15, 3),
((SELECT id FROM trails WHERE slug = 'instagram-ia'), 'Stories Interativos', 'stories-interativos', 'Engaje sua audiência com stories', 'Game', 10, 4),
((SELECT id FROM trails WHERE slug = 'instagram-ia'), 'Legendas que Convertem', 'legendas-que-convertem', 'Copy para posts que geram resultado', 'Game', 15, 5),
((SELECT id FROM trails WHERE slug = 'instagram-ia'), 'Hashtags Estratégicas com IA', 'hashtags-estrategicas', 'Encontre as hashtags certas', 'Game', 10, 6),
((SELECT id FROM trails WHERE slug = 'instagram-ia'), 'Análise de Concorrência', 'analise-concorrencia', 'Use IA para analisar seus concorrentes', 'Game', 15, 7),
((SELECT id FROM trails WHERE slug = 'instagram-ia'), 'Bio e Perfil Otimizado', 'bio-perfil-otimizado', 'Transforme visitantes em seguidores', 'Game', 10, 8),
((SELECT id FROM trails WHERE slug = 'instagram-ia'), 'Automatização de DMs', 'automatizacao-dms', 'Respostas inteligentes com IA', 'Game', 15, 9),
((SELECT id FROM trails WHERE slug = 'instagram-ia'), '🐉 Boss: Insta Pro', 'boss-insta-pro', 'Desafio final: crie uma semana de conteúdo', 'Boss', 50, 10);

-- TRILHA 8: TikTok + IA
INSERT INTO public.trails (title, description, slug, icon_name, order_index, is_published) VALUES
('TikTok + IA', 'Trends, Roteiro e Edição para viralizar no TikTok', 'tiktok-ia', 'Smartphone', 8, true);

INSERT INTO public.lessons (trail_id, title, slug, description, type, xp_reward, order_index) VALUES
((SELECT id FROM trails WHERE slug = 'tiktok-ia'), 'Algoritmo do TikTok', 'algoritmo-tiktok', 'Como o TikTok decide o que mostrar', 'Game', 10, 1),
((SELECT id FROM trails WHERE slug = 'tiktok-ia'), 'Trends com IA', 'trends-com-ia', 'Identifique trends antes de viralizarem', 'Game', 15, 2),
((SELECT id FROM trails WHERE slug = 'tiktok-ia'), 'Roteiros Curtos', 'roteiros-curtos', 'Scripts para vídeos de 15-60 segundos', 'Game', 10, 3),
((SELECT id FROM trails WHERE slug = 'tiktok-ia'), 'Hooks que Prendem', 'hooks-que-prendem', 'Os primeiros 3 segundos decidem tudo', 'Game', 15, 4),
((SELECT id FROM trails WHERE slug = 'tiktok-ia'), 'Edição com CapCut + IA', 'edicao-capcut-ia', 'Edite vídeos profissionais sem experiência', 'Game', 15, 5),
((SELECT id FROM trails WHERE slug = 'tiktok-ia'), 'Vozes e Narrações IA', 'vozes-narracoes-ia', 'Use IA para narrar seus vídeos', 'Game', 15, 6),
((SELECT id FROM trails WHERE slug = 'tiktok-ia'), 'TikTok Shop + IA', 'tiktok-shop-ia', 'Venda usando conteúdo inteligente', 'Game', 15, 7),
((SELECT id FROM trails WHERE slug = 'tiktok-ia'), 'Analytics com IA', 'analytics-tiktok-ia', 'Leia seus dados com inteligência', 'Game', 10, 8),
((SELECT id FROM trails WHERE slug = 'tiktok-ia'), 'Multi-plataforma', 'multi-plataforma-tiktok', 'Adapte conteúdo para YouTube Shorts e Reels', 'Game', 15, 9),
((SELECT id FROM trails WHERE slug = 'tiktok-ia'), '🐉 Boss: Viral Creator', 'boss-viral-creator', 'Desafio final: crie um vídeo viral', 'Boss', 50, 10);

-- TRILHA 9: Automação com N8N
INSERT INTO public.trails (title, description, slug, icon_name, order_index, is_published) VALUES
('Automação com N8N', 'Crie fluxos e automações inteligentes sem programar', 'automacao-n8n', 'Zap', 9, true);

INSERT INTO public.lessons (trail_id, title, slug, description, type, xp_reward, order_index) VALUES
((SELECT id FROM trails WHERE slug = 'automacao-n8n'), 'O que é Automação?', 'o-que-e-automacao', 'Por que automatizar e quando vale a pena', 'Game', 10, 1),
((SELECT id FROM trails WHERE slug = 'automacao-n8n'), 'Conhecendo o N8N', 'conhecendo-n8n', 'Interface, nodes e sua primeira automação', 'Game', 10, 2),
((SELECT id FROM trails WHERE slug = 'automacao-n8n'), 'Triggers e Webhooks', 'triggers-webhooks', 'Inicie fluxos automaticamente', 'Game', 15, 3),
((SELECT id FROM trails WHERE slug = 'automacao-n8n'), 'Integrando APIs', 'integrando-apis', 'Conecte serviços externos', 'Game', 20, 4),
((SELECT id FROM trails WHERE slug = 'automacao-n8n'), 'IA dentro do N8N', 'ia-dentro-n8n', 'Use ChatGPT, Claude e Gemini nos fluxos', 'Game', 20, 5),
((SELECT id FROM trails WHERE slug = 'automacao-n8n'), 'Automação de E-mail', 'automacao-email-n8n', 'Respostas automáticas inteligentes', 'Game', 15, 6),
((SELECT id FROM trails WHERE slug = 'automacao-n8n'), 'WhatsApp + N8N', 'whatsapp-n8n', 'Chatbot no WhatsApp sem código', 'Game', 20, 7),
((SELECT id FROM trails WHERE slug = 'automacao-n8n'), 'CRM Automatizado', 'crm-automatizado', 'Gerencie leads com automação', 'Game', 15, 8),
((SELECT id FROM trails WHERE slug = 'automacao-n8n'), 'Monitoramento e Alertas', 'monitoramento-alertas', 'Fique sabendo de tudo automaticamente', 'Game', 15, 9),
((SELECT id FROM trails WHERE slug = 'automacao-n8n'), '🐉 Boss: Automation King', 'boss-automation-king', 'Desafio final: crie um sistema automatizado completo', 'Boss', 50, 10);

-- TRILHA 10: Chatbots com IA
INSERT INTO public.trails (title, description, slug, icon_name, order_index, is_published) VALUES
('Chatbots com IA', 'Crie chatbots inteligentes para WhatsApp, Sites e mais', 'chatbots-ia', 'MessageCircle', 10, true);

INSERT INTO public.lessons (trail_id, title, slug, description, type, xp_reward, order_index) VALUES
((SELECT id FROM trails WHERE slug = 'chatbots-ia'), 'O que são Chatbots?', 'o-que-sao-chatbots', 'De bots simples a assistentes com IA', 'Game', 10, 1),
((SELECT id FROM trails WHERE slug = 'chatbots-ia'), 'Arquitetura de Chatbot', 'arquitetura-chatbot', 'Como projetar um chatbot que funciona', 'Game', 15, 2),
((SELECT id FROM trails WHERE slug = 'chatbots-ia'), 'Chatbot para WhatsApp', 'chatbot-whatsapp', 'Integre com Evolution API e N8N', 'Game', 20, 3),
((SELECT id FROM trails WHERE slug = 'chatbots-ia'), 'Chatbot para Sites', 'chatbot-sites', 'Widget flutuante com IA', 'Game', 15, 4),
((SELECT id FROM trails WHERE slug = 'chatbots-ia'), 'Base de Conhecimento', 'base-conhecimento', 'Alimente seu bot com informações', 'Game', 15, 5),
((SELECT id FROM trails WHERE slug = 'chatbots-ia'), 'Personalidade do Bot', 'personalidade-bot', 'Crie um tom de voz único', 'Game', 10, 6),
((SELECT id FROM trails WHERE slug = 'chatbots-ia'), 'Handoff para Humano', 'handoff-humano', 'Quando o bot deve transferir para um atendente', 'Game', 15, 7),
((SELECT id FROM trails WHERE slug = 'chatbots-ia'), 'Métricas e Otimização', 'metricas-otimizacao-bot', 'Melhore seu bot com dados reais', 'Game', 15, 8),
((SELECT id FROM trails WHERE slug = 'chatbots-ia'), 'Chatbot Multi-canal', 'chatbot-multi-canal', 'Um bot, múltiplas plataformas', 'Game', 20, 9),
((SELECT id FROM trails WHERE slug = 'chatbots-ia'), '🐉 Boss: Bot Builder', 'boss-bot-builder', 'Desafio final: crie um chatbot completo', 'Boss', 50, 10);
