import { useCallback, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  List,
  ListItem,
  TextField,
  Box,
} from "@mui/material";
import {
  Add as AddIcon,
  HorizontalRule as HorizontalRuleIcon,
} from "@mui/icons-material";
import { useGetCategoriesQuery } from "../../../../../redux/slices/shared/apiSlice";
import { useTranslation } from "react-i18next";
import { GetCategoryItem } from "../../../../dashboard/pages/CategoryDashboard/types";
import {
  accordionStyle,
  inputStyle,
  listItemStyle,
} from "../../../../../constants";
import { Props } from "../../../page/Shop/type";

const FilterAccordions = ({
  onCategorySelect,
  onRatingSelect,
  onInStockChange,
  onOutStockChange,
  onMinPriceChange,
  onMaxPriceChange,
  selectedCategories,
  selectedRating,
  inOutStock,
  minMaxPrice,
}: Props) => {
  const { t } = useTranslation();
  const { data: categoriesListData } = useGetCategoriesQuery();

  const [expandedAccordion, setExpandedAccordion] = useState<number | false>(
    false
  );

  const handleAccordionToggle = useCallback(
    (accordionIndex: number) => {
      setExpandedAccordion(
        expandedAccordion === accordionIndex ? false : accordionIndex
      );
    },
    [expandedAccordion]
  );

  const onToggle = (id: number) => () => handleAccordionToggle(id);

  const categoriesList = categoriesListData?.data.length;
  const ratings = [5, 4, 3, 2, 1];

  return (
    <Box sx={accordionStyle}>
      <Accordion expanded={expandedAccordion === 1} onChange={onToggle(1)}>
        <AccordionSummary
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography sx={{ width: "220px", fontWeight: "500" }}>
            {t("availability")}
          </Typography>
          {expandedAccordion === 1 ? <HorizontalRuleIcon /> : <AddIcon />}
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem sx={listItemStyle}>
              <Checkbox
                onChange={onInStockChange}
                checked={inOutStock.inStock}
              />
              <Typography style={{ fontWeight: "500" }}>
                {t("inStock")}
              </Typography>
            </ListItem>
            <ListItem sx={listItemStyle}>
              <Checkbox
                onChange={onOutStockChange}
                checked={inOutStock.outStock}
              />
              <Typography style={{ fontWeight: "500" }}>
                {t("outOfStock")}
              </Typography>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expandedAccordion === 2} onChange={onToggle(2)}>
        <AccordionSummary
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography sx={{ width: "220px", fontWeight: "500" }}>
            {t("price")}
          </Typography>
          {expandedAccordion === 2 ? <HorizontalRuleIcon /> : <AddIcon />}
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              type="number"
              placeholder={t("minPrice")}
              sx={inputStyle}
              value={minMaxPrice.min}
              onChange={onMinPriceChange}
            />
            <TextField
              type="number"
              placeholder={t("maxPrice")}
              sx={inputStyle}
              onChange={onMaxPriceChange}
              value={minMaxPrice.max}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expandedAccordion === 3} onChange={onToggle(3)}>
        <AccordionSummary
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography sx={{ width: "220px", fontWeight: "500" }}>
            {t("categories")}
          </Typography>
          {expandedAccordion === 3 ? <HorizontalRuleIcon /> : <AddIcon />}
        </AccordionSummary>
        <AccordionDetails>
          {categoriesList ? (
            <List>
              {categoriesListData.data.map((category: GetCategoryItem) => (
                <ListItem key={category._id} sx={listItemStyle}>
                  <Checkbox
                    checked={selectedCategories.includes(category._id)}
                    onChange={() => onCategorySelect(category._id)}
                  />
                  <Typography style={{ fontWeight: "500" }}>
                    {category?.name}
                  </Typography>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>{t("noCategoriesAvailable")}</Typography>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expandedAccordion === 4} onChange={onToggle(4)}>
        <AccordionSummary>
          <Typography sx={{ width: "220px", fontWeight: "500" }}>
            {t("rating")}
          </Typography>
          {expandedAccordion === 4 ? <HorizontalRuleIcon /> : <AddIcon />}
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            {ratings.map((rating) => {
              const isChecked = selectedRating.includes(rating);
              const handleChange = () => onRatingSelect(rating);
              return (
                <Box
                  key={rating}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Checkbox checked={isChecked} onChange={handleChange} />
                  <Typography>
                    {rating} {t(`Star`)}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FilterAccordions;
