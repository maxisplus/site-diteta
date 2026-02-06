import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

const WHATSAPP_OBRIGADO =
  'https://wa.me/5527992866320?text=Ol%C3%A1%2C%20acabei%20de%20assinar%20o%20produto';

export const metadata: Metadata = {
  title: 'Obrigado - Dieta Calculada',
  description: 'Próximos passos para começar a usar o Dieta Calculada no WhatsApp.',
};

export default function ObrigadoPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full text-center">
        {/* Logo */}
        <a href="/" className="inline-block mb-8">
          <Image
            src="/cropped-principal.png"
            alt="Dieta Calculada"
            width={160}
            height={160}
            className="w-28 h-28 md:w-32 md:h-32 object-contain hover:opacity-80 transition-opacity"
            priority
          />
        </a>

        {/* Título */}
        <h1 className="text-[22px] md:text-[28px] font-extrabold text-gray-900 leading-tight mb-6">
          Parabéns por tomar a decisão de entrar no Dieta Calculada! 🎉
        </h1>
        <p className="text-[18px] md:text-[20px] font-semibold text-[#FF911A] mb-8">
          Os próximos passos são simples:
        </p>

        {/* Texto */}
        <p className="text-[15px] md:text-[17px] text-gray-600 leading-relaxed mb-6">
          Seu acesso é 100% no WhatsApp. Para começar a usar, é só enviar uma
          mensagem no nosso número oficial, salvar o contato e começar a usar.
        </p>

        <p className="text-[15px] md:text-[17px] text-gray-600 leading-relaxed mb-2">
          O botão abaixo te leva diretamente pro nosso WhatsApp. É só clicar
          nele e enviar a mensagem padrão, sem mexer nela!
        </p>
        <p className="text-[18px] text-gray-500 mb-8" aria-hidden="true">
          ⬇️ ⬇️ ⬇️
        </p>

        {/* Botão */}
        <Link
          href={WHATSAPP_OBRIGADO}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-[16px] md:text-[18px] px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="flex-shrink-0"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          CLIQUE AQUI
        </Link>

        {/* Link para voltar */}
        <p className="mt-10">
          <a
            href="/"
            className="text-[14px] text-gray-500 hover:text-[#FF911A] transition-colors"
          >
            ← Voltar ao site
          </a>
        </p>
      </div>
    </div>
  );
}
