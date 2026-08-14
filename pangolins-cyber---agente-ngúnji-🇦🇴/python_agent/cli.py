"""
Interface CLI Interativa do Ngúnji
Pangolins Cyber 🇦🇴
"""

import sys
from .agent import NgunjiAgent, CompanyProfile


def run_cli():
    print("\n" + "=" * 70)
    print("🛡️  NGÚNJI - Copiloto de Ciber-higiene e Proteção de Dados (Angola 🇦🇴)")
    print("    Desenvolvido por Pangolins Cyber")
    print("    Base Legal: Lei nº 22/11, Orientações APD, NIST CSF e CIS Controls")
    print("=" * 70)
    print("Digite a sua pergunta sobre cibersegurança ou Lei 22/11.")
    print("Comandos especiais: 'sair' para encerrar, 'perfil' para ajustar a empresa.\n")

    agent = NgunjiAgent()
    profile = CompanyProfile(
        name="PME Exemplo Luanda",
        sector="Comércio & Serviços",
        employees=15,
        registered_with_apd=False
    )

    while True:
        try:
            query = input("\n👤 Você > ").strip()
            if not query:
                continue

            if query.lower() in ["sair", "exit", "quit"]:
                print("\n👋 Ngúnji: Até breve! Mantenha os seus dados seguros e backups atualizados.")
                break

            if query.lower() == "perfil":
                print("\n⚙️ Configuração da Empresa:")
                name = input(f"Nome da Empresa [{profile.name}]: ").strip() or profile.name
                sector = input(f"Sector [{profile.sector}]: ").strip() or profile.sector
                profile.name = name
                profile.sector = sector
                print(f"✅ Perfil atualizado para: {profile.name} ({profile.sector})")
                continue

            print("\n⏳ A consultar o Ngúnji e a base jurídica da Lei 22/11...")
            response = agent.ask(query, company_profile=profile)

            print("\n" + "-" * 70)
            print(f"🛡️  Ngúnji (Pangolins Cyber):\n")
            print(response.text)
            print("-" * 70)

            # Exibir Citações Jurídicas
            if response.citations:
                print("\n📚 Fontes Jurídicas e Técnicas Citadas:")
                for i, c in enumerate(response.citations, 1):
                    art = f" (Art. {c.article})" if c.article else ""
                    print(f"  [{i}] {c.document_title}{art} — {c.authority}")

            # Status do Scope Guard
            if not response.scope_guard.in_scope:
                print(f"\n⚠️  [Scope Guard]: {response.scope_guard.reason}")

        except (KeyboardInterrupt, EOFError):
            print("\n\n👋 Sessão encerrada.")
            sys.exit(0)


if __name__ == "__main__":
    run_cli()
