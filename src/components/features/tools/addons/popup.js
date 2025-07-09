import Button from "@/components/ui/Button";

export default function Buffer({ onClose, onInsert, buffer, currentField }) {
    // Получаем элементы буфера для текущего поля
    const bufferItems = buffer[currentField] || [];
    
    // Если буфер пустой, показываем сообщение
    if (bufferItems.length === 0) {
        return (
            <div className="w-full h-full bg-white absolute top-0 left-0 p-[2rem]">
                <div className="flex relative h-full w-full border-dashed border-(--color-gray-plus) rounded-[0.75rem] items-center justify-center border-[3px]">
                    <Button inverted className="!w-fit !rounded-[100px] absolute top-0 -translate-y-[50%]" onClick={onClose}>Закрыть Pop-Up</Button>

                    <div className="flex flex-col gap-[1.5rem] items-center w-[80%]">
                        <div className="flex flex-col gap-[0.5rem] items-center">
                            <h3>Буфер</h3>
                            <p className="text-(--color-gray-black)">Буфер пуст. Добавьте элементы с помощью кнопки "+" или откройте буфер для генерации шаблонов</p>
                        </div>
                        <Button inverted className="!w-[60%]" onClick={onClose}>Вернуться назад</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-white absolute top-0 left-0 p-[2rem]">
            <div className="flex relative h-full w-full border-dashed border-(--color-gray-plus) rounded-[0.75rem] items-center justify-center border-[3px]">
                <Button inverted className="!w-fit !rounded-[100px] absolute top-0 -translate-y-[50%]" onClick={onClose}>Закрыть Pop-Up</Button>

                <div className="flex flex-col gap-[1.5rem] items-center w-[80%]">
                    <div className="flex flex-col gap-[0.5rem] items-center">
                        <h3>Буфер</h3>
                        <p className="text-(--color-gray-black)">Выберите вариант который хотите вставить</p>
                    </div>
                    <div className="flex flex-col gap-[0.5rem] w-full">
                        {bufferItems.map((item, index) => (
                            <Button 
                                key={index}
                                inverted 
                                className="!justify-start" 
                                onClick={() => onInsert(item)}
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                    <Button inverted className="!w-[60%]" onClick={onClose}>Вернуться назад</Button>
                </div>
            </div>
        </div>
    )
}