import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import EnhancedTableHead from '../../../../components/Table/EnhancedTableHead'
import { getSorting } from '../../../../utils/utils'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 600
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  actionCell: {
    display: 'flex',
    flexDirection: 'row'
  }
})

class CloudTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order: 'asc',
      orderBy: 'serviceDefinition',
      page: 0,
      rowsPerPage: 10
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  render() {
    const { data, classes, columnData, deleteInterCloudEntry } = this.props
    const { order, orderBy, rowsPerPage, page } = this.state
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              onRequestSort={this.handleRequestSort}
              order={order}
              orderBy={orderBy}
              rowCount={data.length}
              columnData={columnData}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow hover key={n.interCloudEntryId}>
                      <TableCell>{n.serviceDefinition}</TableCell>
                      <TableCell>{n.interfaces.join(',')}</TableCell>
                      <TableCell className={classes.actionCell}>
                        <IconButton
                          color="secondary"
                          aria-label="Delete Entry"
                          onClick={deleteInterCloudEntry(n.interCloudEntryId)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </Paper>
    )
  }
}

CloudTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  columnData: PropTypes.array.isRequired,
  deleteInterCloudEntry: PropTypes.func.isRequired
}

export default withStyles(styles)(CloudTable)
