import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useRef, FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "./burgerConstructor.module.css";

import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { TIngredient, TIngredientWithUniqueId } from '../../utils/types/ingredients-types';
import type { Identifier, XYCoord } from "dnd-core";
import { counterDecrease } from "../../services/slices/ingredients";
import { deleteFilling, moveFilling } from "../../services/slices/constructor";


type DragAndDrop = {
    ingredient: TIngredient,
    index: number,
    type: string
} 


const DragAndDropContainer: FC = () => {
    const { ingredients } = useAppSelector((store) => store.constructorBurger);

    return (
        <div className={styles.scrollableBox}>
            {ingredients.fillings.map((ingredient, idx) => {
                return <DragAndDropItem ingredient={ingredient} index={idx} key={ingredient.uuid}/>
                })
            }
            {ingredients.fillings.length === 0 
                ?
                <div className={`${styles.emptyConstructorItem} ${styles.fillings}`}>
                    Выберите начинку
                </div>
                :
                null
            }
        </div>
    )
}


function DragAndDropItem({ ingredient, index }: { ingredient: TIngredientWithUniqueId; index: number;}):JSX.Element {
    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement>(null); 

    const [{ handlerId }, drop] = useDrop<
        DragAndDrop,
        void,
        { handlerId: Identifier | null }
    >({
        accept: ["filling"],
        collect(monitor) {
        return {
            handlerId: monitor.getHandlerId(),
        };
        },
        hover(item, monitor) {
        if (!ref.current) {
            return;
        }
        // Индекс перемещаемого элемента
        const dragIndex = item.index;
        // Индекс текущего элемента (над которым находится курсор при dnd)
        const hoverIndex = index;

        // Выходим, если индексы сопадают
        if (dragIndex === hoverIndex) {
            return;
        }

        // Получаем положение текущего элемента относительно экрана
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Получаем центр текущего элемента по вертикали
        const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Получаем положение курсора
        const clientOffset = monitor.getClientOffset();
        // Получаем положение курсора относительно текущего элемента
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

        // Выходим, если перемещаемый элемент ниже, чем 50% от высоты текущего
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Выходим, если перемещаемый элемент выше, чем 50% от высоты текущего
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        dispatch(moveFilling({ from: dragIndex, to: hoverIndex }));

        // Сразу меняем индекс перемещаемого элемента
        item.index = hoverIndex;
        },
    });
    const [, drag] = useDrag({
        type: "filling",
        item: () => {
        // Определяем элемент
        return { index };
        },
        collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    const deleteIngredient = (uuid:string, id:string) => {
        dispatch(deleteFilling(uuid));
        dispatch(counterDecrease(id));
    };

    return (
        <div
        className={styles.itemWrap}
        ref={ref}
        data-handler-id={handlerId}
        >
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => deleteIngredient(ingredient.uuid, ingredient._id)}
            />
        </div>
    )
}

export default DragAndDropContainer;