import { useState, useEffect } from 'react'

import Header from '@/components/layout/Header'

// ИЗМЕНЕНИЕ 1: Импортируем иконку крестика и убираем ненужные
import CloseIcon from '@/assets/general/close.svg'
import CopyIcon from '@/assets/general/copy.svg'

import Button from '@/components/ui/Button'
import Switcher from '@/components/ui/Switcher'
import Block from '@/components/features/public/Block'

function getCookie(name) {
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${name}=`)
	if (parts.length === 2)
		return decodeURIComponent(parts.pop().split(';').shift())
}

function getLocalStorage(key) {
	try {
		const value = localStorage.getItem(key)
		return value ? JSON.parse(value) : null // или return [] если нужно гарантированно массив
	} catch (error) {
		console.error('Ошибка чтения из localStorage:', error)
		return null // или return [] если нужно гарантированно массив
	}
}

function parseHistoryCookie() {
	const cookie = localStorage.getItem('history') || ''
	if (!cookie) return []

	try {
		return JSON.parse(cookie)
	} catch (e) {
		console.error('Failed to parse history cookie', e)
		return []
	}
}

function formatDate(dateString) {
	const date = new Date(dateString)
	return date.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})
}

export default function HistoryPage({ goTo }) {
	const [type, setType] = useState('text')
	const [history, setHistory] = useState([])

	useEffect(() => {
		const historyData = parseHistoryCookie()
		setHistory(historyData)
	}, [])

	// ИЗМЕНЕНИЕ 2: Обновляем логику фильтрации для объединенной категории "Разное"
	const filteredHistory = history.filter(item => {
		if (type === 'misc') {
			// Показываем все типы "Разное", если выбрана эта категория
			return item.type === 'misc' || item.type === 'misc-static' || item.type === 'misc-dynamic'
		}
		return item.type === type
	})

	const handleCopy = text => {
		navigator.clipboard.writeText(text)
	}

	return (
		<>
            {/* ИЗМЕНЕНИЕ 1: Заменяем иконки навигации на кнопку закрытия */}
			<Header>
			<Header.Heading>МАЯК ОКО</Header.Heading>
				<Button icon onClick={() => {
						const previousPage = sessionStorage.getItem('previousPage') || 'mayakOko';
						sessionStorage.setItem('currentPage', previousPage);
						goTo(previousPage);
					}}>
					<CloseIcon />
				</Button>
			</Header>
			<div className='hero' style={{ placeItems: 'center' }}>
				<div className=' flex flex-col gap-[1.6rem] items-center col-start-4 col-end-10 h-full'>
					<div className='flex flex-col gap-[1rem] w-full'>
						<div className='flex flex-col gap-[0.5rem]'>
						<Switcher value={type} onChange={setType} className="!w-full">
                                <Switcher.Option value="text">Текст</Switcher.Option>
                                <Switcher.Option value="audio">Аудио</Switcher.Option>
								<Switcher.Option value="visual-static">Статика</Switcher.Option>
								<Switcher.Option value="visual-dynamic">Динамика</Switcher.Option>
                                <Switcher.Option value="interactive">Интерактив</Switcher.Option>
                                <Switcher.Option value="data">Данные</Switcher.Option>
                                <Switcher.Option value="misc">Разное</Switcher.Option>
                            </Switcher>
                            {/* ИЗМЕНЕНИЕ 2: Объединяем "Разное" в одну кнопку */}
						</div>
					</div>
					<div className='flex flex-col gap-[1.6rem] items-center w-[70%]'>
						<h3>История</h3>
						<div className='flex flex-col gap-[0.75rem]'>
							<div className='flex flex-col gap-[0.25rem]'>
								<span className='big'>История создания запросов</span>
								<p className='small text-(--color-gray-black)'>
									Здесь отображается история промтов по выбранной выше категории
								</p>
							</div>
							{filteredHistory.length > 0 ? (
								filteredHistory.map((item, index) => (
									<Block key={index}>
										<p className='line-clamp-3'>{item.prompt}</p>
										<div className='flex items-center'>
											<span className='text-(--color-gray-black) w-full'>
												{formatDate(item.date)}
											</span>
											<Button
												inverted
												className='!w-fit'
												onClick={() => handleCopy(item.prompt)}
											>
												<CopyIcon />
											</Button>
										</div>
									</Block>
								))
							) : (
								<Block>
									<p className='text-(--color-gray-black)'>
										История запросов пуста
									</p>
								</Block>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}