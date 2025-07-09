import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRemoveTranslation } from "../../../hooks/use-book-translation";
import { BookRemoveTranslationDto } from "../../../dto/book-translation.dto";

interface BookPageBlockProps {
    bookId: string;
    pageText: string;
    translations: {
        pos_id: number;
        origin: string;
        translation: string;
        translation_id: number;
    }[];
    globalPageNumber: number;
    isLast: boolean;
    isDark: boolean;
    fontSize: number;
    lineBgClass: string;
    badgeBgClass: string;
    borderColorClass: string;
}

export const BookPageBlock: React.FC<BookPageBlockProps> = ({
    bookId,
    pageText,
    translations,
    globalPageNumber,
    isLast,
    isDark,
    fontSize,
    lineBgClass,
    badgeBgClass,
    borderColorClass,
}) => {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);

    const [contextMenuPos, setContextMenuPos] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [contextMenuTranslationId, setContextMenuTranslationId] = useState<
        number | null
    >(null);

    const removeTranslation = useRemoveTranslation(bookId, globalPageNumber);

    // Логируем массив переводов один раз при смене страницы или переводов
    useEffect(() => {
        console.log(
            `[Page ${globalPageNumber}] Translations array:`,
            translations
        );
    }, [globalPageNumber, translations]);

    const isEmpty = !pageText.trim();

    // Разбиваем текст страницы на токены (слова, пробелы, знаки препинания)
    const tokens = isEmpty
        ? []
        : pageText.match(/(\p{L}+|[^\s\p{L}]+|\s+)/gu) || [];

    const baseClass = isDark
        ? "cursor-default select-none hover:bg-gray-700"
        : "cursor-default select-none hover:bg-gray-300";

    // Создаем карту переводов по pos_id для быстрого поиска
    const trMap = new Map<
        number,
        { translation: string; translation_id: number }
    >();
    translations.forEach(({ pos_id, translation, translation_id }) => {
        trMap.set(pos_id, { translation, translation_id });
    });

    // Обработчик клика вне компонента для скрытия контекстного меню
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) {
                setContextMenuPos(null);
                setContextMenuTranslationId(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Контекстное меню на ПКМ
    const handleRightClick = (e: React.MouseEvent, translationId: number) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenuTranslationId(translationId);
        setContextMenuPos({ x: e.clientX, y: e.clientY });
    };

    // Удаление перевода
    const handleRemoveClick = () => {
        if (contextMenuTranslationId !== null) {
            const dto: BookRemoveTranslationDto = {
                pageIndex: globalPageNumber,
                translationId: contextMenuTranslationId,
            };
            removeTranslation.mutate(dto);
            setContextMenuPos(null);
            setContextMenuTranslationId(null);
        }
    };

    // Счетчик позиции слова на странице (обнуляется при каждом рендере)
    let posId = 0;

    return (
        <div
            ref={containerRef}
            className="w-full flex flex-col items-start relative mb-8"
            style={{ fontSize }}
            data-pageid={globalPageNumber}
        >
            <div
                className="flex items-center w-full absolute left-0 -top-3 z-10 min-w-[370px]"
                style={{ pointerEvents: "none" }}
            >
                <div className={`flex-1 h-0.5 ${lineBgClass} mr-[-10px]`} />
                <span className={`mx-2 text-xs font-mono px-1 ${badgeBgClass}`}>
                    {globalPageNumber}
                </span>
                <div className={`flex-1 h-0.5 ${lineBgClass} ml-[-10px]`} />
            </div>

            <div
                className={`relative w-full min-w-[370px] border-l-2 border-r-2 ${
                    isLast ? "border-b-2" : ""
                } ${borderColorClass} ${
                    isDark
                        ? "bg-gray-800 text-gray-100"
                        : "bg-white text-gray-800"
                }`}
                style={{ marginTop: -3, marginBottom: -28 }}
            >
                <div className="px-6 py-4 whitespace-pre-wrap pt-5 pd-5">
                    {isEmpty
                        ? t("bookOverview.emptyPage")
                        : tokens.map((token, i) => {
                              const isWord = /^\p{L}+$/u.test(token);
                              if (isWord) {
                                  posId++;
                                  const tr = trMap.get(posId);

                                  if (tr) {
                                      console.log(
                                          `[Page ${globalPageNumber}] Word #${posId}: "${token}" → ✅ Match (${tr.translation})`
                                      );
                                  }

                                  return (
                                      <span
                                          key={i}
                                          data-posid={posId}
                                          className={`${baseClass} relative group ${
                                              tr
                                                  ? isDark
                                                      ? "bg-yellow-500/20"
                                                      : "bg-blue-400/20"
                                                  : ""
                                          }`}
                                          onClick={(e) => {
                                              if (tr) {
                                                  e.preventDefault();
                                                  e.stopPropagation();
                                              }
                                          }}
                                          onContextMenu={(e) =>
                                              tr &&
                                              handleRightClick(
                                                  e,
                                                  tr.translation_id
                                              )
                                          }
                                      >
                                          {token}
                                          {tr?.translation && (
                                              <div
                                                  className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs px-2 py-1 rounded shadow z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                                  style={{
                                                      backgroundColor: isDark
                                                          ? "#374151"
                                                          : "#e5e7eb",
                                                      color: isDark
                                                          ? "#fff"
                                                          : "#000",
                                                  }}
                                              >
                                                  {tr.translation}
                                              </div>
                                          )}
                                      </span>
                                  );
                              } else {
                                  return <span key={i}>{token}</span>;
                              }
                          })}
                </div>
            </div>

            {contextMenuPos && (
                <div
                    style={{
                        position: "fixed",
                        top: contextMenuPos.y,
                        left: contextMenuPos.x,
                        backgroundColor: isDark ? "#333" : "#fff",
                        border: `1px solid ${isDark ? "#555" : "#ccc"}`,
                        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                        borderRadius: 4,
                        zIndex: 1000,
                        padding: "8px",
                    }}
                >
                    <button
                        onClick={handleRemoveClick}
                        style={{
                            color: "white",
                            backgroundColor: "#e3342f",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: 3,
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        {t("bookOverview.removeTranslation") ||
                            "Удалить перевод"}
                    </button>
                </div>
            )}
        </div>
    );
};
