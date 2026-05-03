import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import {
  JsonLd,
  WebSiteSchema,
  OrganizationSchema,
  ArticleSchema,
  FAQPageSchema,
  HowToSchema,
  ServiceSchema,
  BreadcrumbListSchema,
} from '../json-ld'

describe('JsonLd', () => {
  it('renders a script tag with type application/ld+json', () => {
    const { container } = render(<JsonLd data={{ '@context': 'https://schema.org', '@type': 'Thing' }} />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeTruthy()
  })

  it('serializes data as JSON', () => {
    const data = { '@context': 'https://schema.org', '@type': 'Thing', name: 'Test' }
    const { container } = render(<JsonLd data={data} />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(JSON.parse(script!.textContent!)).toEqual(data)
  })
})

describe('WebSiteSchema', () => {
  it('produces WebSite schema with inLanguage: vi', () => {
    const { container } = render(<WebSiteSchema name="Bói Toán" url="https://boitoan.com.vn" />)
    const script = container.querySelector('script[type="application/ld+json"]')
    const json = JSON.parse(script!.textContent!)
    expect(json['@type']).toBe('WebSite')
    expect(json.inLanguage).toBe('vi')
    expect(json.name).toBe('Bói Toán')
    expect(json.url).toBe('https://boitoan.com.vn')
  })
})



describe('OrganizationSchema', () => {
  it('produces Organization schema for the canonical brand entity', () => {
    const { container } = render(
      <OrganizationSchema
        name="Bói Toán"
        url="https://boitoan.com.vn/"
        description="Nội dung Tử Vi và Kinh Dịch bằng tiếng Việt"
      />
    )
    const script = container.querySelector('script[type="application/ld+json"]')
    const json = JSON.parse(script!.textContent!)
    expect(json['@type']).toBe('Organization')
    expect(json['@id']).toBe('https://boitoan.com.vn/#organization')
    expect(json.name).toBe('Bói Toán')
    expect(json.url).toBe('https://boitoan.com.vn')
    expect(json.inLanguage).toBe('vi')
    expect(json.areaServed.name).toBe('Vietnam')
  })
})

describe('ArticleSchema', () => {
  it('produces Article schema with inLanguage: vi and required fields', () => {
    const props = {
      headline: 'Tử Vi Tuổi Tý 2026',
      description: 'Xem tử vi tuổi Tý năm 2026 chi tiết',
      url: 'https://boitoan.com.vn/tuvi/tuoi-ty-2026-nam',
      datePublished: '2026-05-01',
      dateModified: '2026-05-01',
      authorName: 'Bói Toán',
    }
    const { container } = render(<ArticleSchema {...props} />)
    const script = container.querySelector('script[type="application/ld+json"]')
    const json = JSON.parse(script!.textContent!)
    expect(json['@type']).toBe('Article')
    expect(json.inLanguage).toBe('vi')
    expect(json.headline).toBe(props.headline)
    expect(json.author['@type']).toBe('Organization')
    expect(json.author.name).toBe('Bói Toán')
  })
})

describe('FAQPageSchema', () => {
  it('produces FAQPage schema with inLanguage: vi', () => {
    const faqs = [
      { question: 'Tử vi là gì?', answer: 'Tử vi là...' },
      { question: 'Cách xem tử vi?', answer: 'Bạn cần...' },
    ]
    const { container } = render(<FAQPageSchema faqs={faqs} />)
    const script = container.querySelector('script[type="application/ld+json"]')
    const json = JSON.parse(script!.textContent!)
    expect(json['@type']).toBe('FAQPage')
    expect(json.inLanguage).toBe('vi')
    expect(json.mainEntity).toHaveLength(2)
    expect(json.mainEntity[0]['@type']).toBe('Question')
    expect(json.mainEntity[0].name).toBe('Tử vi là gì?')
    expect(json.mainEntity[0].acceptedAnswer.text).toBe('Tử vi là...')
  })
})

describe('HowToSchema', () => {
  it('produces HowTo schema with inLanguage: vi and steps', () => {
    const steps = [
      { name: 'Bước 1', text: 'Nhập ngày sinh', url: 'https://boitoan.com.vn/lap-la-so#step1' },
      { name: 'Bước 2', text: 'Xem lá số', url: 'https://boitoan.com.vn/lap-la-so#step2' },
    ]
    const { container } = render(
      <HowToSchema
        name="Cách lập lá số tử vi"
        description="Hướng dẫn lập lá số tử vi online"
        steps={steps}
      />
    )
    const script = container.querySelector('script[type="application/ld+json"]')
    const json = JSON.parse(script!.textContent!)
    expect(json['@type']).toBe('HowTo')
    expect(json.inLanguage).toBe('vi')
    expect(json.step).toHaveLength(2)
    expect(json.step[0]['@type']).toBe('HowToStep')
  })
})

describe('ServiceSchema', () => {
  it('produces Service schema with inLanguage: vi', () => {
    const { container } = render(
      <ServiceSchema
        name="Lập Lá Số Tử Vi"
        description="Công cụ lập lá số tử vi online miễn phí"
        url="https://boitoan.com.vn/lap-la-so"
        provider="Bói Toán"
      />
    )
    const script = container.querySelector('script[type="application/ld+json"]')
    const json = JSON.parse(script!.textContent!)
    expect(json['@type']).toBe('Service')
    expect(json.inLanguage).toBe('vi')
    expect(json.name).toBe('Lập Lá Số Tử Vi')
    expect(json.provider['@type']).toBe('Organization')
    expect(json.provider.name).toBe('Bói Toán')
    expect(json.areaServed.name).toBe('Vietnam')
  })
})

describe('BreadcrumbListSchema', () => {
  it('produces BreadcrumbList schema with inLanguage: vi', () => {
    const items = [
      { name: 'Trang chủ', url: 'https://boitoan.com.vn/' },
      { name: 'Tử vi', url: 'https://boitoan.com.vn/tuvi' },
      { name: 'Tuổi Tý 2026', url: 'https://boitoan.com.vn/tuvi/tuoi-ty-2026-nam' },
    ]
    const { container } = render(<BreadcrumbListSchema items={items} />)
    const script = container.querySelector('script[type="application/ld+json"]')
    const json = JSON.parse(script!.textContent!)
    expect(json['@type']).toBe('BreadcrumbList')
    expect(json.inLanguage).toBe('vi')
    expect(json.itemListElement).toHaveLength(3)
    expect(json.itemListElement[0].position).toBe(1)
    expect(json.itemListElement[2].item.name).toBe('Tuổi Tý 2026')
  })
})
