import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Checkbox, List, ListItem, TextField, Box, } from "@mui/material";
import { Add as AddIcon, HorizontalRule as HorizontalRuleIcon, } from "@mui/icons-material";
import { useGetCategoriesQuery } from "../../../../../redux/slices/shared/apiSlice";
import { useTranslation } from "react-i18next";
import { accordionStyle, inputStyle, listItemStyle, } from "../../../../../constants";
const FilterAccordions = ({ onCategorySelect, onRatingSelect, onInStockChange, onOutStockChange, onMinPriceChange, onMaxPriceChange, selectedCategories, selectedRating, inOutStock, minMaxPrice, }) => {
    const { t } = useTranslation();
    const { data: categoriesListData } = useGetCategoriesQuery();
    const [expandedAccordion, setExpandedAccordion] = useState(false);
    const handleAccordionToggle = useCallback((accordionIndex) => {
        setExpandedAccordion(expandedAccordion === accordionIndex ? false : accordionIndex);
    }, [expandedAccordion]);
    const onToggle = (id) => () => handleAccordionToggle(id);
    const categoriesList = categoriesListData?.data.length;
    const ratings = [5, 4, 3, 2, 1];
    return (_jsxs(Box, { sx: accordionStyle, children: [_jsxs(Accordion, { expanded: expandedAccordion === 1, onChange: onToggle(1), children: [_jsxs(AccordionSummary, { sx: { display: "flex", justifyContent: "space-between" }, children: [_jsx(Typography, { sx: { width: "220px", fontWeight: "500" }, children: t("availability") }), expandedAccordion === 1 ? _jsx(HorizontalRuleIcon, {}) : _jsx(AddIcon, {})] }), _jsx(AccordionDetails, { children: _jsxs(List, { children: [_jsxs(ListItem, { sx: listItemStyle, children: [_jsx(Checkbox, { onChange: onInStockChange, checked: inOutStock.inStock }), _jsx(Typography, { style: { fontWeight: "500" }, children: t("inStock") })] }), _jsxs(ListItem, { sx: listItemStyle, children: [_jsx(Checkbox, { onChange: onOutStockChange, checked: inOutStock.outStock }), _jsx(Typography, { style: { fontWeight: "500" }, children: t("outOfStock") })] })] }) })] }), _jsxs(Accordion, { expanded: expandedAccordion === 2, onChange: onToggle(2), children: [_jsxs(AccordionSummary, { sx: { display: "flex", justifyContent: "space-between" }, children: [_jsx(Typography, { sx: { width: "220px", fontWeight: "500" }, children: t("price") }), expandedAccordion === 2 ? _jsx(HorizontalRuleIcon, {}) : _jsx(AddIcon, {})] }), _jsx(AccordionDetails, { children: _jsxs(Box, { sx: { display: "flex", gap: 2 }, children: [_jsx(TextField, { type: "number", placeholder: t("minPrice"), sx: inputStyle, value: minMaxPrice.min, onChange: onMinPriceChange }), _jsx(TextField, { type: "number", placeholder: t("maxPrice"), sx: inputStyle, onChange: onMaxPriceChange, value: minMaxPrice.max })] }) })] }), _jsxs(Accordion, { expanded: expandedAccordion === 3, onChange: onToggle(3), children: [_jsxs(AccordionSummary, { sx: { display: "flex", justifyContent: "space-between" }, children: [_jsx(Typography, { sx: { width: "220px", fontWeight: "500" }, children: t("categories") }), expandedAccordion === 3 ? _jsx(HorizontalRuleIcon, {}) : _jsx(AddIcon, {})] }), _jsx(AccordionDetails, { children: categoriesList ? (_jsx(List, { children: categoriesListData.data.map((category) => (_jsxs(ListItem, { sx: listItemStyle, children: [_jsx(Checkbox, { checked: selectedCategories.includes(category._id), onChange: () => onCategorySelect(category._id) }), _jsx(Typography, { style: { fontWeight: "500" }, children: category?.name })] }, category._id))) })) : (_jsx(Typography, { children: t("noCategoriesAvailable") })) })] }), _jsxs(Accordion, { expanded: expandedAccordion === 4, onChange: onToggle(4), children: [_jsxs(AccordionSummary, { children: [_jsx(Typography, { sx: { width: "220px", fontWeight: "500" }, children: t("rating") }), expandedAccordion === 4 ? _jsx(HorizontalRuleIcon, {}) : _jsx(AddIcon, {})] }), _jsx(AccordionDetails, { children: _jsx(Box, { children: ratings.map((rating) => {
                                const isChecked = selectedRating.includes(rating);
                                const handleChange = () => onRatingSelect(rating);
                                return (_jsxs(Box, { sx: { display: "flex", alignItems: "center" }, children: [_jsx(Checkbox, { checked: isChecked, onChange: handleChange }), _jsxs(Typography, { children: [rating, " ", t(`Star`)] })] }, rating));
                            }) }) })] })] }));
};
export default FilterAccordions;
