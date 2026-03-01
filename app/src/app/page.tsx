"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Gamepad2,
  Brain,
  Trophy,
  Sparkles,
  ArrowRight,
  Star,
  Target,
  Users,
  BarChart3,
  Shield,
  MessageCircle,
  ChevronRight,
  Flame,
  Crown,
  Rocket,
  BookOpen,
  Bot,
  Image,
  Video,
  Instagram,
  Smartphone,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const trails = [
  {
    icon: Brain,
    title: "O que é IA?",
    desc: "Fundamentos de Inteligência Artificial",
    lessons: 10,
    color: "text-brand-400",
    bg: "bg-brand-500/10",
  },
  {
    icon: MessageCircle,
    title: "ChatGPT & Assistentes",
    desc: "Domine a IA conversacional",
    lessons: 12,
    color: "text-xp-400",
    bg: "bg-xp-500/10",
  },
  {
    icon: Bot,
    title: "Gemini, Claude & Outros",
    desc: "Compare e use múltiplas IAs",
    lessons: 10,
    color: "text-accent-400",
    bg: "bg-accent-500/10",
  },
  {
    icon: Image,
    title: "Imagens com IA",
    desc: "Midjourney, DALL-E, Flux",
    lessons: 12,
    color: "text-warn-400",
    bg: "bg-warn-500/10",
  },
  {
    icon: Video,
    title: "Vídeos com IA",
    desc: "Sora, Runway, Kling",
    lessons: 10,
    color: "text-error-400",
    bg: "bg-error-500/10",
  },
  {
    icon: BookOpen,
    title: "Textos & Copy com IA",
    desc: "Posts, e-mails, roteiros",
    lessons: 10,
    color: "text-brand-300",
    bg: "bg-brand-400/10",
  },
  {
    icon: Instagram,
    title: "Instagram + IA",
    desc: "Reels, Stories, Carrosséis",
    lessons: 10,
    color: "text-accent-300",
    bg: "bg-accent-400/10",
  },
  {
    icon: Smartphone,
    title: "TikTok + IA",
    desc: "Trends, Roteiro, Edição",
    lessons: 10,
    color: "text-xp-300",
    bg: "bg-xp-400/10",
  },
  {
    icon: Zap,
    title: "Automação com N8N",
    desc: "Fluxos e automações inteligentes",
    lessons: 10,
    color: "text-warn-500",
    bg: "bg-warn-400/10",
  },
  {
    icon: MessageCircle,
    title: "Chatbots com IA",
    desc: "WhatsApp, Sites, Integração",
    lessons: 10,
    color: "text-brand-400",
    bg: "bg-brand-500/10",
  },
];

const gameTypes = [
  {
    name: "Quiz Battle",
    desc: "Perguntas com timer e vidas",
    emoji: "⚡",
  },
  {
    name: "Arraste & Solte",
    desc: "Monte o prompt perfeito",
    emoji: "🎯",
  },
  {
    name: "Preencha a Lacuna",
    desc: "Complete o código ou texto",
    emoji: "✏️",
  },
  {
    name: "Conecte os Pares",
    desc: "Ligue conceito à definição",
    emoji: "🔗",
  },
  {
    name: "Ordene os Passos",
    desc: "Monte o fluxo correto",
    emoji: "📋",
  },
  {
    name: "Desafio Relâmpago",
    desc: "Máximo de acertos em 60s",
    emoji: "⏱️",
  },
  {
    name: "Sandbox",
    desc: "Experimente livremente",
    emoji: "🧪",
  },
  {
    name: "Boss Battle",
    desc: "Desafio final da trilha",
    emoji: "🐉",
  },
];

const levels = [
  {
    name: "Explorer",
    emoji: "🟢",
    desc: "Sou novo nisso, quero entender do zero",
    details: "Linguagem simples, visual, muitas analogias e passo a passo guiado",
    color: "border-xp-500/30 hover:border-xp-500/60",
    badge: "bg-xp-500/15 text-xp-400",
  },
  {
    name: "Builder",
    emoji: "🟡",
    desc: "Já sei o básico, quero aplicar",
    details: "Prático, com contexto técnico acessível e desafios moderados",
    color: "border-warn-500/30 hover:border-warn-500/60",
    badge: "bg-warn-500/15 text-warn-400",
  },
  {
    name: "Master",
    emoji: "🔴",
    desc: "Quero dominar e implementar",
    details: "Técnico, direto, projetos complexos com APIs e automação",
    color: "border-error-500/30 hover:border-error-500/60",
    badge: "bg-error-500/15 text-error-400",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-dvh">
      {/* ═══ HEADER ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg">Dominia</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-surface-400">
            <a href="#funcionalidades" className="hover:text-surface-100 transition-colors">
              Funcionalidades
            </a>
            <a href="#trilhas" className="hover:text-surface-100 transition-colors">
              Trilhas
            </a>
            <a href="#niveis" className="hover:text-surface-100 transition-colors">
              Níveis
            </a>
            <a href="#precos" className="hover:text-surface-100 transition-colors">
              Preços
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" aria-label="Entrar na conta">
              Entrar
            </Button>
            <Button size="sm" aria-label="Começar a aprender IA gratuitamente">
              Começar Grátis
            </Button>
          </div>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[128px]" />

        <motion.div
          className="relative max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Badge variant="brand" size="md" className="mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Plataforma #1 de IA Gamificada
          </Badge>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
            Aprenda IA como se{" "}
            <span className="text-gradient-brand">estivesse jogando</span>
          </h1>

          <p className="text-lg sm:text-xl text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Cada lição é um jogo. Cada acerto ganha XP. Cada trilha desbloqueia
            um novo poder. Aprenda Inteligência Artificial no seu ritmo e no seu
            nível.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg">
              <Rocket className="w-5 h-5" />
              Começar Grátis
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="lg">
              <Gamepad2 className="w-5 h-5" />
              Ver como funciona
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-surface-400">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-400" />
              <span className="text-sm">
                <strong className="text-surface-100">10+</strong> trilhas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-xp-400" />
              <span className="text-sm">
                <strong className="text-surface-100">8</strong> tipos de jogos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-accent-400" />
              <span className="text-sm">
                <strong className="text-surface-100">100+</strong> lições
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-warn-400" />
              <span className="text-sm">
                <strong className="text-surface-100">3</strong> níveis
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ FUNCIONALIDADES ═══ */}
      <section id="funcionalidades" className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <Badge variant="accent" size="md" className="mb-4">
              <Zap className="w-3.5 h-3.5" />
              Por que Dominia?
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Aprender nunca foi tão <span className="text-gradient-brand">viciante</span>
            </h2>
            <p className="text-surface-400 max-w-prose mx-auto">
              Combinamos gamificação profunda com IA adaptativa para criar uma
              experiência de aprendizado única no mercado.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Gamepad2,
                title: "Cada Lição é um Jogo",
                desc: "8 tipos de jogos diferentes. Quiz, arraste, ordene, sandbox e mais. Nunca fica repetitivo.",
                color: "text-brand-400",
              },
              {
                icon: Brain,
                title: "IA que Se Adapta a Você",
                desc: "Mesmo conteúdo, 3 abordagens diferentes. Você escolhe seu nível e a IA adapta tudo.",
                color: "text-accent-400",
              },
              {
                icon: Flame,
                title: "Ofensiva & Conquistas",
                desc: "Mantenha sua sequência diária, ganhe XP, suba de nível e desbloqueie badges exclusivos.",
                color: "text-warn-400",
              },
              {
                icon: Target,
                title: "Aplicação Prática Imediata",
                desc: "Cada lição termina com um resultado real. Crie algo, aplique algo, veja o resultado na hora.",
                color: "text-xp-400",
              },
              {
                icon: BarChart3,
                title: "Dashboard Completo",
                desc: "Acompanhe seu progresso, veja seu heatmap de atividade, descubra seus pontos fortes.",
                color: "text-brand-300",
              },
              {
                icon: Shield,
                title: "Assistente IA 24h",
                desc: "Dúvida no meio da lição? O assistente responde no seu nível, no contexto exato.",
                color: "text-error-400",
              },
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card hover glow="brand" className="h-full">
                  <feature.icon className={`w-8 h-8 ${feature.color} mb-4`} />
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-surface-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ TIPOS DE JOGOS ═══ */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-surface-900/50" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <Badge variant="xp" size="md" className="mb-4">
              <Gamepad2 className="w-3.5 h-3.5" />
              8 Tipos de Jogos
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Cada lição, um <span className="text-gradient-brand">jogo diferente</span>
            </h2>
            <p className="text-surface-400 max-w-prose mx-auto">
              Variedade garante que você nunca enjoe. Cada tipo de jogo exercita
              uma habilidade cognitiva diferente.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {gameTypes.map((game, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card hover className="text-center h-full">
                  <div className="text-4xl mb-3">{game.emoji}</div>
                  <h3 className="font-display font-semibold text-sm mb-1">
                    {game.name}
                  </h3>
                  <p className="text-xs text-surface-400">{game.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ TRILHAS ═══ */}
      <section id="trilhas" className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <Badge variant="brand" size="md" className="mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              10 Trilhas no Lançamento
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Sua jornada de <span className="text-gradient-brand">IA começa aqui</span>
            </h2>
            <p className="text-surface-400 max-w-prose mx-auto">
              De fundamentos a automação avançada. Cada trilha desbloqueada é um
              novo poder conquistado.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {trails.map((trail, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card hover glow="brand" className="h-full">
                  <div
                    className={`w-10 h-10 rounded-xl ${trail.bg} flex items-center justify-center mb-3`}
                  >
                    <trail.icon className={`w-5 h-5 ${trail.color}`} />
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-1">
                    {trail.title}
                  </h3>
                  <p className="text-xs text-surface-400 mb-3">{trail.desc}</p>
                  <Badge variant="default" size="sm">
                    {trail.lessons} lições
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ NÍVEIS ═══ */}
      <section id="niveis" className="py-24 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-surface-900/50" />
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <Badge variant="warn" size="md" className="mb-4">
              <Users className="w-3.5 h-3.5" />
              Você Escolhe
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Mesmo conteúdo,{" "}
              <span className="text-gradient-brand">sua forma de aprender</span>
            </h2>
            <p className="text-surface-400 max-w-xl mx-auto">
              O conteúdo é o mesmo para todos. O que muda é a linguagem, a
              profundidade e o tipo de exercício. Você decide como quer aprender.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {levels.map((level, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card
                  hover
                  className={`h-full border-2 ${level.color} transition-colors`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{level.emoji}</div>
                    <Badge
                      className={`${level.badge} mb-4`}
                      size="md"
                    >
                      {level.name}
                    </Badge>
                    <p className="font-semibold text-surface-100 mb-2">
                      &ldquo;{level.desc}&rdquo;
                    </p>
                    <p className="text-sm text-surface-400">{level.details}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ PREÇOS ═══ */}
      <section id="precos" className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <Badge variant="xp" size="md" className="mb-4">
              <Trophy className="w-3.5 h-3.5" />
              Planos
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Comece grátis,{" "}
              <span className="text-gradient-brand">evolua quando quiser</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Free */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border border-surface-700">
                <div className="text-center mb-6">
                  <h3 className="font-display text-xl font-bold mb-1">Grátis</h3>
                  <p className="text-surface-400 text-sm">Para experimentar</p>
                  <div className="mt-4">
                    <span className="font-display text-4xl font-bold">R$ 0</span>
                    <span className="text-surface-400 text-sm">/mês</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "3 trilhas acessíveis",
                    "5 lições por dia",
                    "5 vidas por sessão",
                    "10 msgs do assistente IA/dia",
                    "1 freeze de ofensiva/semana",
                    "Dashboard básico",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-surface-300">
                      <ChevronRight className="w-4 h-4 text-surface-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" fullWidth>
                  Começar Grátis
                </Button>
              </Card>
            </motion.div>

            {/* Premium */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 border-brand-500/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 gradient-brand text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                  POPULAR
                </div>
                <div className="text-center mb-6">
                  <h3 className="font-display text-xl font-bold mb-1">Premium</h3>
                  <p className="text-surface-400 text-sm">Acesso total</p>
                  <div className="mt-4">
                    <span className="font-display text-4xl font-bold text-gradient-brand">
                      R$ 29,90
                    </span>
                    <span className="text-surface-400 text-sm">/mês</span>
                  </div>
                  <p className="text-xs text-surface-500 mt-1">
                    ou R$ 199,90/ano (economize 44%)
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Todas as trilhas desbloqueadas",
                    "Lições ilimitadas",
                    "Vidas ilimitadas",
                    "Assistente IA ilimitado",
                    "3 freezes de ofensiva/semana",
                    "Dashboard completo com insights",
                    "Certificados de conclusão",
                    "Sem anúncios",
                    "Suporte prioritário",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-surface-200">
                      <Star className="w-4 h-4 text-brand-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button fullWidth size="lg">
                  <Crown className="w-4 h-4" />
                  Começar Trial de 7 Dias
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/15 rounded-full blur-[100px]" />

        <motion.div
          className="relative max-w-3xl mx-auto text-center"
          {...fadeInUp}
          viewport={{ once: true }}
          whileInView="animate"
          initial="initial"
        >
          <div className="text-5xl mb-6">🏰</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Pronto para <span className="text-gradient-brand">dominar a IA</span>?
          </h2>
          <p className="text-lg text-surface-400 mb-10 max-w-xl mx-auto">
            Junte-se a milhares de pessoas que estão aprendendo IA de forma
            divertida e viciante. Sua primeira lição é grátis.
          </p>
          <Button size="lg">
            <Rocket className="w-5 h-5" />
            Começar Minha Jornada
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-surface-800 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold">Dominia</span>
            </div>
            <p className="text-sm text-surface-500">
              © 2026 Dominia. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-surface-400">
              <a href="#" className="hover:text-surface-100 transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-surface-100 transition-colors">
                Privacidade
              </a>
              <a href="#" className="hover:text-surface-100 transition-colors">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
