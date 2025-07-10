import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useRemoveTranslation } from "../../../hooks/use-book-translation";
import { BookRemoveTranslationDto } from "../../../dto/book-translation.dto";
import { TranslationContextMenu } from "./translation-context-menu";

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
    const [contextMenuPosId, setContextMenuPosId] = useState<number | null>(
        null
    );

    const removeTranslation = useRemoveTranslation(bookId);

    useEffect(() => {
        console.log(
            `[Page ${globalPageNumber}] Translations array:`,
            translations
        );
    }, [globalPageNumber, translations]);

    const isEmpty = !pageText.trim();

    const tokens = isEmpty
        ? []
        : pageText.match(/(\p{L}+|[^\s\p{L}]+|\s+)/gu) || [];

    const baseClass = isDark
        ? "cursor-default select-none hover:bg-gray-700"
        : "cursor-default select-none hover:bg-gray-300";

    const trMap = new Map<
        number,
        { translation: string; translation_id: number }
    >();
    translations.forEach(({ pos_id, translation, translation_id }) => {
        trMap.set(pos_id, { translation, translation_id });
    });

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) {
                setContextMenuPos(null);
                setContextMenuTranslationId(null);
                setContextMenuPosId(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleRightClick = (
        e: React.MouseEvent,
        translationId: number,
        posId: number
    ) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenuTranslationId(translationId);
        setContextMenuPosId(posId);
        setContextMenuPos({ x: e.clientX, y: e.clientY });
    };

    const handleRemoveClick = () => {
        if (contextMenuTranslationId !== null && contextMenuPosId !== null) {
            const dto: BookRemoveTranslationDto = {
                pageIndex: globalPageNumber,
                translationId: contextMenuTranslationId,
                posId: contextMenuPosId,
            };
            removeTranslation.mutate(dto, {
                onSuccess: () => {
                    toast.success(t("bookOverview.deletedSuccess"));
                    setContextMenuPos(null);
                    setContextMenuTranslationId(null);
                    setContextMenuPosId(null);
                },
                onError: (error: any) => {
                    toast.error(
                        t("bookOverview.deleteFailed") ||
                            ` ${error.message || error}`
                    );
                },
            });
        }
    };

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
                                                  tr.translation_id,
                                                  posId
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

            {contextMenuPos && contextMenuTranslationId !== null && (
                <TranslationContextMenu
                    posX={contextMenuPos.x}
                    posY={contextMenuPos.y}
                    isDark={isDark}
                    onRemove={handleRemoveClick}
                    onClose={() => {
                        setContextMenuPos(null);
                        setContextMenuTranslationId(null);
                        setContextMenuPosId(null);
                    }}
                />
            )}
        </div>
    );
};
