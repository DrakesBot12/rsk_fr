import Button from '@/components/ui/Button'

export default function Buffer({
	onClose,
	onInsert,
	onUpdate,
	buffer,
	currentField,
}) {
	const bufferItems = buffer[currentField] || []

	// Функция для удаления элемента из буфера
	const handleDelete = (itemToDelete, index) => {
		// Создаем новый массив без удаляемого элемента
		const newBufferItems = [
			...bufferItems.slice(0, index),
			...bufferItems.slice(index + 1),
		]

		// Обновляем буфер через callback
		const newBuffer = { ...buffer, [currentField]: newBufferItems }
		onUpdate(newBuffer)
	}

	// Если буфер пустой, показываем сообщение
	if (bufferItems.length === 0) {
		return (
			<div className='w-full h-full bg-white absolute top-0 left-0 p-[2rem]'>
				{/* ... (остается без изменений) ... */}
			</div>
		)
	}

	return (
		<div className='w-full h-full bg-white absolute top-0 left-0 p-[2rem]'>
			<div className='flex relative h-full w-full border-dashed border-(--color-gray-plus) rounded-[0.75rem] items-center justify-center border-[3px]'>
				{/* ... (кнопка закрытия без изменений) ... */}

				<div className='flex flex-col gap-[1.5rem] items-center w-[80%]'>
					{/* ... (заголовок без изменений) ... */}

					<div className='flex flex-col gap-[0.5rem] w-full'>
						{bufferItems.map((item, index) => (
							<div key={index} className='group flex items-center gap-[0.5rem]'>
								<Button
									inverted
									className='!justify-start flex-1'
									onClick={() => onInsert(item)}
								>
									{item}
								</Button>
								{/* Показываем кнопку удаления только для пользовательских элементов (первые 6 - стандартные) */}
								{index >= 6 && (
									<button
										className='hidden group-hover:flex items-center justify-center w-6 h-6 text-red-500 hover:text-red-700'
										onClick={e => {
											e.stopPropagation()
											handleDelete(item, index)
										}}
										title='Удалить'
									>
										×
									</button>
								)}
							</div>
						))}
					</div>
					<Button inverted className='!w-[60%]' onClick={onClose}>
						Вернуться назад
					</Button>
				</div>
			</div>
		</div>
	)
}
