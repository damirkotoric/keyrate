import { PortableText, PortableTextComponents } from '@portabletext/react'

// Default components for rendering portable text
export const defaultPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 mt-6">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mb-3 mt-5">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold mb-2 mt-4">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-primary hover:underline"
        >
          {children}
        </a>
      )
    },
  },
}

export function renderPortableText(value: any, components?: PortableTextComponents) {
  if (!value) return null
  return <PortableText value={value} components={{ ...defaultPortableTextComponents, ...components }} />
}

